/**
 * TaskContainer module.
 *
 * TODO This module needs to be cleaned up.
 * TODO Split the responsibilities. Storing tasks should remain here, but other things like fetching data from the server (should go to TaskModel) and rendering segments on a map.
 * @param navigationModel
 * @param neighborhoodModel
 * @param streetViewService
 * @param svl
 * @param tracker
 */
function TaskContainer (navigationModel, neighborhoodModel, streetViewService, svl, tracker) {
    var self = this;

    var previousTasks = [];
    var currentTask = null;
    var beforeJumpNewTask = null;
    var tasksFinishedLoading = false;

    self._tasks = [];

    self.tasksLoaded = function() {
        return tasksFinishedLoading;
    }

    self.getFinishedAndInitNextTask = function (finished) {
        var newTask = self.nextTask(finished);
        if (!newTask) {
            svl.neighborhoodModel.setComplete();
        } else {
            svl.taskContainer.initNextTask(newTask);
        }
        return newTask;
    };

    self.initNextTask = function (nextTaskIn) {
        var geometry;
        var lat;
        var lng;

        var currentPosition = navigationModel.getPosition();
        nextTaskIn.setStreetEdgeDirection(currentPosition.lat, currentPosition.lng);

        geometry = nextTaskIn.getGeometry();
        lat = geometry.coordinates[0][1];
        lng = geometry.coordinates[0][0];

        var STREETVIEW_MAX_DISTANCE = 25;
        var latLng = new google.maps.LatLng(lat, lng);

        navigationModel.disableWalking();

        if (streetViewService) {
            streetViewService.getPanorama({location: latLng, radius: STREETVIEW_MAX_DISTANCE, source: google.maps.StreetViewSource.OUTDOOR},
                function (streetViewPanoramaData, status) {
                    navigationModel.enableWalking();
                    if (status === google.maps.StreetViewStatus.OK) {
                        lat = streetViewPanoramaData.location.latLng.lat();
                        lng = streetViewPanoramaData.location.latLng.lng();
                        self.setCurrentTask(nextTaskIn);
                        navigationModel.setPosition(lat, lng, function(){
                            navigationModel.preparePovReset();
                        });
                    } else {
                        console.error("Error loading Street View imagery");
                        svl.tracker.push("PanoId_NotFound", {'Location': JSON.stringify(latLng)});
                        nextTaskIn.complete();
                        // no street view available in this range.
                        self.getFinishedAndInitNextTask(nextTaskIn);
                    }
                });
        }
    };

    /**
     * End the current task.
     */
    function endTask(task, nextTask) {
        if (tracker) tracker.push("TaskEnd");
        task.complete();
        // Go through the tasks and mark the completed task as isComplete=true
        for (var i = 0, len = self._tasks.length;  i < len; i++) {
            if (task.getStreetEdgeId() === self._tasks[i].getStreetEdgeId()) {
                // Check if the reference passed in from the method parameter and the array are the same.
                // This is needed because otherwise we could update a reference to the same task twice.
                if (task !== self._tasks[i]) {
                    self._tasks[i].complete();
                }
            }
        }

        // Update the audited distance in the right sidebar.
        updateAuditedDistance();

        if (!('user' in svl) || (svl.user.getProperty('role') === "Anonymous" &&
            getCompletedTaskDistance({units: 'kilometers'}) > 0.15 &&
            !svl.popUpMessage.haveAskedToSignIn())) {
            svl.popUpMessage.promptSignIn();
        }

        // Submit the data.
        var data = svl.form.compileSubmissionData(task),
            staged = svl.storage.get("staged");

        if (staged.length > 0) {
            staged.push(data);
            svl.form.submit(staged, task);
            svl.storage.set("staged", []);  // Empty the staged data.
        } else {
            svl.form.submit(data, task);
        }

        pushATask(task); // Push the data into previousTasks.

        // Updates the segments that the user has already explored.
        self.update();
        // Renders the next street that the user will explore.
        if(nextTask) nextTask.render();

        return task;
    }

    /**
     * Request the server to populate tasks
     * TODO Move this to somewhere else. TaskModel?
     * @param callback A callback function
     * @param async {boolean}
     */
    self.fetchTasks = function (callback, async) {
        if (typeof async == "undefined") async = true;
        var currMission = svl.missionContainer.getCurrentMission();
        var currMissionId = currMission.getProperty('missionId');
        var url;
        if (svl.neighborhoodModel.isRoute) url = `/routeTasks?userRouteId=${svl.userRouteId}`;
        else url = `/tasks?regionId=${svl.neighborhoodModel.currentNeighborhood().getRegionId()}`;

        $.ajax({
            url: url,
            async: async,
            type: 'get',
            success: function (result) {
                var task;
                for (var i = 0; i < result.length; i++) {
                    task = svl.taskFactory.create(result[i], false);
                    if ((result[i].features[0].properties.completed)) task.complete();
                    // Skip the task that we were given to start with so that we don't add a duplicate.
                    if (task.getStreetEdgeId() !== getCurrentTask().getStreetEdgeId()) {
                        self._tasks.push(task);
                        // If the street was part of the curr mission, add it to the list!
                        if (task.getProperty('currentMissionId') === currMissionId) {
                            currMission.pushATaskToTheRoute(task);
                        }
                    }
                }
                tasksFinishedLoading = true;

                if (callback) callback();
            },
            error: function (result) {
                console.error(result);
            }
        });
    };

    /**
     * Updates the task priorities for the given set of streets. These should be updates from other users' audits.
     * @param updatedPriorities
    */
    function updateTaskPriorities(updatedPriorities) {
        // Loop through all updatedPriorities and update self._tasks with the new priorities.
        updatedPriorities.forEach(function (newPriority) {
            const index = self._tasks.findIndex((s) => { return s.getStreetEdgeId() === newPriority.streetEdgeId; });
            self._tasks[index].setProperty('priority', newPriority.priority);
        });
    }

    /**
     * Find incomplete tasks (i.e., street edges) that are connected to the given task.
     *
     * @param taskIn {object} Task
     * @param acrossAllUsers
     * @param threshold {number} Distance threshold
     * @param unit {string} Distance unit
     * @returns {Array}
     * @private
     */
    self._findConnectedTasks = function (taskIn, acrossAllUsers, threshold, unit) {
        var tasks = self.getTasks();

        if (acrossAllUsers) {
            tasks = tasks.filter(function (t) { return t.streetCompletedByAnyUser(); });
        }

        if (tasks) {
            var connectedTasks = [];
            if (!threshold) threshold = 0.01;  // 0.01 km.
            if (!unit) unit = {units: 'kilometers'};

            tasks = tasks.filter(function (t) { return !t.isComplete(); });

            if (taskIn) {
                tasks = tasks.filter(function (t) { return t.getStreetEdgeId() !== taskIn.getStreetEdgeId(); });

                for (var i = 0, len = tasks.length; i < len; i++) {
                    if (taskIn.isConnectedTo(tasks[i], threshold, unit)) {
                        connectedTasks.push(tasks[i]);
                    }
                }
                return connectedTasks;
            } else {
                return util.shuffle(tasks);
            }
        } else {
            return [];
        }
    };

    /**
     * Get the total distance of completed segments
     * @params {unit} String can be degrees, radians, miles, or kilometers
     * @returns {number} distance in unit.
     */
    function getCompletedTaskDistance(unit) {
        if (!unit) unit = { units: i18next.t('common:unit-distance') };
        var completedTasks = getCompletedTasks(),
            geojson,
            feature,
            distance = 0;

        if (completedTasks) {
            for (var i = 0, len = completedTasks.length; i < len; i++) {
                geojson = completedTasks[i].getGeoJSON();
                feature = geojson.features[0];
                distance += turf.length(feature, unit);
            }
        }
        if (!currentTask.isComplete()) distance += getCurrentTaskDistance(unit);

        return distance;
    }

    /**
     * Get the total distance of segments completed by any user.
     *
     * @returns {number} distance in unit.
     */
    function getCompletedTaskDistanceAcrossAllUsersUsingPriority() {
        var unit = { units: i18next.t('common:unit-distance') };
        var tasks = self.getTasks().filter(function(t) { return t.getStreetPriority() < 1; });
        var geojson;
        var feature;
        var distance = 0;

        if (tasks) {
            for (var i = 0; i < tasks.length; i++) {
                geojson = tasks[i].getGeoJSON();
                feature = geojson.features[0];
                distance += turf.length(feature, unit);
            }
        }
        return distance;
    }

    /**
     *
     * @param unit {string} Distance unit
     * @returns {*}
     */
    function getCurrentTaskDistance(unit) {
        if (!unit) unit = {units: 'kilometers'};

        if (currentTask) {
            var currentLatLng = navigationModel.getPosition();
            currentTask.updateTheFurthestPointReached(currentLatLng.lat, currentLatLng.lng);
            return currentTask.getAuditedDistance(unit);
        }
        return 0;
    }

    /**
     * This method returns the completed tasks.
     * @returns {Array}
     */
    function getCompletedTasks() {
        return self._tasks.filter(function (task) { return task.isComplete(); });
    }

    /**
     * Return list of tasks completed by any user.
     * @returns {Array of tasks}
     */
    function getCompletedTasksAllUsersUsingPriority() {
        return self._tasks.filter(function (task) { return task.getStreetPriority() < 1; });
    }

    /**
     * Get the current task
     * @returns {*}
     */
    function getCurrentTask () {
        return currentTask;
    }

    /**
     * Get the before jump task
     * @returns {*}
     */
    function getBeforeJumpTask () {
        return beforeJumpNewTask;
    }

    /**
     * Find incomplete tasks by the user.
     */
    self.getIncompleteTasks = function () {
        return self._tasks.filter(function (task) { return !task.isComplete(); });
    };

    /**
     * Find incomplete tasks across all users.
     */
    self.getIncompleteTasksAcrossAllUsersUsingPriority = function () {
        var incompleteTasksByUser = self._tasks.filter(function (task) { return !task.isComplete(); });

        var incompleteTasksAcrossAllUsers = [];
        if (incompleteTasksByUser.length > 0) {
            incompleteTasksAcrossAllUsers = incompleteTasksByUser.filter(function (t) {
                return t.getStreetPriority() === 1;
            });
        }

        return incompleteTasksAcrossAllUsers;
    };

    this.getTasks = function () {
        return self._tasks;
    };

    /**
     * Check if the current task is the first task in this session
     * @returns {boolean}
     */
    function isFirstTask () {
        return length() === 0;
    }

    /**
     * Get the length of the previous tasks
     * @returns {*|Number}
     */
    function length () {
        return previousTasks.length;
    }

    /**
     * Checks if finishedTask makes the neighborhood complete across all users; if so, it displays the relevant overlay.
     *
     * @param finishedTask
     */
    function updateNeighborhoodCompleteAcrossAllUsersStatus(finishedTask) {
        // Only run this code if the neighborhood was set as incomplete and user is not on a designated route.
        if (!neighborhoodModel.isRoute && !neighborhoodModel.getNeighborhoodCompleteAcrossAllUsers()) {
            var candidateTasks = self.getIncompleteTasksAcrossAllUsersUsingPriority().filter(function (t) {
                return (t.getStreetEdgeId() !== (finishedTask ? finishedTask.getStreetEdgeId() : null));
            });
            // Indicates neighborhood is complete.
            if (candidateTasks.length === 0) {
                // TODO: Remove the console.log statements if issue #1449 has been resolved.
                console.error('finished neighborhood screen has appeared, logging debug info');
                console.trace();
                console.log('incompleteTasks.length:' +
                    self.getIncompleteTasksAcrossAllUsersUsingPriority().length);
                console.log('finishedTask streetEdgeId: ' + finishedTask.getStreetEdgeId());

                neighborhoodModel.setNeighborhoodCompleteAcrossAllUsers();
                svl.ui.areaComplete.overlay.show();
                var currentNeighborhood = svl.neighborhoodModel.currentNeighborhood();
                var currentNeighborhoodId = currentNeighborhood.getRegionId();

                console.log('neighborhood: ' + currentNeighborhoodId + ": " + currentNeighborhood);

                tracker.push("NeighborhoodComplete_AcrossAllUsers", { 'RegionId': currentNeighborhoodId });
            }
        }
    }

    /**
     * Get the next task and set it as a current task.
     *
     * Procedure:
     * Get the list of the highest priority streets that this user has not audited
     * - If the street you just audited connects to any of those, pick the highest priority one
     * - O/w jump to the highest priority street
     *
     * @param finishedTask The task that has been finished.
     * @returns {*} Next task
     */
    this.nextTask = function (finishedTask) {
        var newTask;
        var userCandidateTasks = null;

        // Check if this task finishes the neighborhood across all users, if so, shows neighborhood complete overlay.
        updateNeighborhoodCompleteAcrossAllUsersStatus(finishedTask);

        // Find the highest priority task not audited by the user.
        var tasksNotCompletedByUser = self.getTasks().filter(function (t) {
            return !t.isComplete() && t.getStreetEdgeId() !== (finishedTask ? finishedTask.getStreetEdgeId() : null);
        }).sort(function(t1, t2) {
            return t2.getStreetPriority() - t1.getStreetPriority();
        });
        if (tasksNotCompletedByUser.length === 0) { // user has audited entire region
            return null;
        }
        var highestPriorityTask = tasksNotCompletedByUser[0];

        // If any of the connected tasks has max discretized priority, pick the highest priority one, o/w take the
        // highest priority task in the region.
        userCandidateTasks = self._findConnectedTasks(finishedTask, false, null, null);

        userCandidateTasks = userCandidateTasks.filter(function(t) {
            return !t.isComplete() && t.getStreetPriorityDiscretized() === highestPriorityTask.getStreetPriorityDiscretized();
        }).sort(function(t1,t2) {
            return t2.getStreetPriority() - t1.getStreetPriority();
        });

        if (userCandidateTasks.length > 0) {
            newTask = userCandidateTasks[0];
        } else {
            newTask = highestPriorityTask;
        }

        // Return the new task. Change the starting point and start time of the new task accordingly.
        if (finishedTask) {
            var coordinate = finishedTask.getLastCoordinate();
            newTask.setStreetEdgeDirection(coordinate.lat, coordinate.lng);
            newTask.setProperty('taskStart', new Date());
        }

        return newTask;
    };

    /**
     * Push a task to previousTasks
     * @param task
     */
    function pushATask (task) {
        if (previousTasks.indexOf(task) < 0) {
            previousTasks.push(task);
        }
    }

    /**
     * Pop a task at the end of previousTasks
     * @returns {*}
     */
    function pop () {
        return previousTasks.pop();
    }

    /**
     * Set the current task
     * @param task
     */
    this.setCurrentTask = function (task) {
        currentTask = task;
        if ('missionContainer' in svl) {
            var currMissionId = svl.missionContainer.getCurrentMission().getProperty('missionId');
            currentTask.setProperty('currentMissionId', currMissionId);
        }
        if (tracker) tracker.push('TaskStart');

        if ('compass' in svl) {
            svl.compass.setTurnMessage();
            svl.compass.showMessage();
            if (!svl.map.getLabelBeforeJumpListenerStatus()) svl.compass.update();
        }

        if ('form' in svl){
            svl.form.submit(svl.form.compileSubmissionData(currentTask), currentTask);
        }
    };

    /**
     * Get the street id of the current task.
     */
    function getCurrentTaskStreetEdgeId() {
        return currentTask ? currentTask.getStreetEdgeId() : null;
    }

    /**
     * Store the before jump new task
     * @param task
     */
    this.setBeforeJumpNewTask = function (task) {
        beforeJumpNewTask = task;
    };

    /**
     *
     * @param unit {string} Distance unit
     */
    function totalLineDistanceInNeighborhood(unit) {
        if (!unit) unit = {units: 'kilometers'};
        var tasks = self.getTasks();

        if (tasks) {
            var distanceArray = tasks.map(function (t) { return t.lineDistance(unit); });
            return distanceArray.sum();
        } else {
            return null;
        }
    }

    /**
     * This method is called from Map.handlerPositionUpdate() to update the color of audited and unaudited street
     * segments on Google Maps.
     * TODO This should be done somewhere else.
     */
    function update () {
        for (var i = 0, len = previousTasks.length; i < len; i++) {
            previousTasks[i].render();
        }

        var currentLatLng = navigationModel.getPosition();
        currentTask.updateTheFurthestPointReached(currentLatLng.lat, currentLatLng.lng);
        currentTask.render();
    }

    /**
     * Update the audited distance in the right sidebar using the length of the streets in the current neighborhood.
     * @returns {updateAuditedDistance}
     */
    function updateAuditedDistance() {
        var distance = 0;
        var neighborhood = svl.neighborhoodContainer.getCurrentNeighborhood();

        if (neighborhood) {
            distance = getCompletedTaskDistance({ units: i18next.t('common:unit-distance') });
        }
        svl.statusFieldNeighborhood.setAuditedDistance(distance);
        svl.statusFieldOverall.setNeighborhoodAuditedDistance(distance);
        return this;
    }

    /**
     * Checks if there are any max priority tasks remaining (proxy for neighborhood being complete across all users.
     * @returns {null|boolean}
     */
    function hasMaxPriorityTask() {
        return self._tasks.filter(function (task) { return task.getStreetPriority() === 1; }).length > 0;
    }

    /**
     * Renders all previously completed tasks. Should be called at page load so it does not render redundantly.
     */
    function renderTasksFromPreviousSessions() {
        var completedTasks = getCompletedTasks();
        if (completedTasks) {
            for (let i = 0; i < completedTasks.length; ++i) {
                completedTasks[i].render();
            }
        }
    }

    self.endTask = endTask;
    self.getCompletedTasks = getCompletedTasks;
    self.getCompletedTasksAllUsersUsingPriority = getCompletedTasksAllUsersUsingPriority;
    self.getCurrentTaskDistance = getCurrentTaskDistance;
    self.getCompletedTaskDistance = getCompletedTaskDistance;
    self.getCompletedTaskDistanceAcrossAllUsersUsingPriority = getCompletedTaskDistanceAcrossAllUsersUsingPriority;
    self.getCurrentTask = getCurrentTask;
    self.getBeforeJumpNewTask = getBeforeJumpTask;
    self.isFirstTask = isFirstTask;
    self.length = length;
    self.push = pushATask;
    self.renderTasksFromPreviousSessions = renderTasksFromPreviousSessions;
    self.hasMaxPriorityTask = hasMaxPriorityTask;
    self.totalLineDistanceInNeighborhood = totalLineDistanceInNeighborhood;
    self.update = update;
    self.updateAuditedDistance = updateAuditedDistance;
    self.updateTaskPriorities = updateTaskPriorities;
    self.getCurrentTaskStreetEdgeId = getCurrentTaskStreetEdgeId;
}
