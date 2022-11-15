function MissionTutorial() {
    let self = this;

    const tutorialDescriptor = {
        'CurbRamp': {
            'missionInstruction1': i18next.t('mission-tutorial.mission-instruction-1'),
            'missionInstruction2': i18next.t('mission-tutorial.curb-ramp.instruction'),
            'slides': [
                {
                    'exampleType': 'correct',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-correct'),
                    'exampleTypeIcon': '#smile-positive',
                    'labelTypeTitle': i18next.t('mission-tutorial.curb-ramp.slide-1.title'),
                    'labelTypeSubtitle': '',
                    'labelTypeDescription': i18next.t('mission-tutorial.curb-ramp.slide-1.description'),
                    'imageURL': 'assets/images/tutorials/curbramp-correct-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-correct'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-correct'),
                        'position' : {
                            'left': '238px',
                            'top': '222px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.curb-ramp.slide-2.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.curb-ramp.slide-2.description'),
                    'imageURL': 'assets/images/tutorials/curbramp-incorrect-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.curb-ramp.slide-3.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.curb-ramp.slide-3.description'),
                    'imageURL': 'assets/images/tutorials/curbramp-incorrect-2.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '435px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                }
            ]
        },
        'NoCurbRamp': {
            'missionInstruction1': i18next.t('mission-tutorial.mission-instruction-1'),
            'missionInstruction2': i18next.t('mission-tutorial.no-curb-ramp.instruction'),
            'slides': [
                {
                    'exampleType': 'correct',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-correct'),
                    'exampleTypeIcon': '#smile-positive',
                    'labelTypeTitle': i18next.t('mission-tutorial.no-curb-ramp.slide-1.title'),
                    'labelTypeSubtitle': '',
                    'labelTypeDescription': i18next.t('mission-tutorial.no-curb-ramp.slide-1.description'),
                    'imageURL': 'assets/images/tutorials/no-curbramp-correct-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-correct'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-correct'),
                        'position' : {
                            'left': '238px',
                            'top': '222px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.no-curb-ramp.slide-2.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.no-curb-ramp.slide-2.description'),
                    'imageURL': 'assets/images/tutorials/no-curbramp-incorrect-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.no-curb-ramp.slide-3.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.no-curb-ramp.slide-3.description'),
                    'imageURL': 'assets/images/tutorials/no-curbramp-incorrect-2.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '397px',
                            'top': '320px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.no-curb-ramp.slide-4.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.no-curb-ramp.slide-4.description'),
                    'imageURL': 'assets/images/tutorials/no-curbramp-incorrect-3.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '326px',
                            'top': '302px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                }
            ]
        },
        'Obstacle': {
            'missionInstruction1': i18next.t('mission-tutorial.mission-instruction-1'),
            'missionInstruction2': i18next.t('mission-tutorial.obstacle.instruction'),
            'slides': [
                {
                    'exampleType': 'correct',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-correct'),
                    'exampleTypeIcon': '#smile-positive',
                    'labelTypeTitle': i18next.t('mission-tutorial.obstacle.slide-1.title'),
                    'labelTypeSubtitle': '',
                    'labelTypeDescription': i18next.t('mission-tutorial.obstacle.slide-1.description'),
                    'imageURL': 'assets/images/tutorials/obstacle-correct-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-correct'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-correct'),
                        'position' : {
                            'left': '238px',
                            'top': '222px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.obstacle.slide-2.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.obstacle.slide-2.description'),
                    'imageURL': 'assets/images/tutorials/obstacle-incorrect-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.obstacle.slide-3.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.obstacle.slide-3.description'),
                    'imageURL': 'assets/images/tutorials/obstacle-incorrect-2.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.obstacle.slide-4.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.obstacle.slide-4.description'),
                    'imageURL': 'assets/images/tutorials/obstacle-incorrect-3.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                }
            ]
        },
        'SurfaceProblem': {
            'missionInstruction1': i18next.t('mission-tutorial.mission-instruction-1'),
            'missionInstruction2': i18next.t('mission-tutorial.surface-problem.instruction'),
            'slides': [
                {
                    'exampleType': 'correct',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-correct'),
                    'exampleTypeIcon': '#smile-positive',
                    'labelTypeTitle': i18next.t('mission-tutorial.surface-problem.slide-1.title'),
                    'labelTypeSubtitle': '',
                    'labelTypeDescription': i18next.t('mission-tutorial.surface-problem.slide-1.description'),
                    'imageURL': 'assets/images/tutorials/surface-problem-correct-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-correct'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-correct'),
                        'position' : {
                            'left': '238px',
                            'top': '222px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.surface-problem.slide-2.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.surface-problem.slide-2.description'),
                    'imageURL': 'assets/images/tutorials/surface-problem-incorrect-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.surface-problem.slide-3.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.surface-problem.slide-3.description'),
                    'imageURL': 'assets/images/tutorials/surface-problem-incorrect-2.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                }
            ]
        },
        'NoSideWalk': {
            'missionInstruction1': i18next.t('mission-tutorial.mission-instruction-1'),
            'missionInstruction2': i18next.t('mission-tutorial.no-sidewalk.instruction'),
            'slides': [
                {
                    'exampleType': 'correct',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-correct'),
                    'exampleTypeIcon': '#smile-positive',
                    'labelTypeTitle': i18next.t('mission-tutorial.no-sidewalk.slide-1.title'),
                    'labelTypeSubtitle': '',
                    'labelTypeDescription': i18next.t('mission-tutorial.no-sidewalk.slide-1.description'),
                    'imageURL': 'assets/images/tutorials/no-sidewalk-correct-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-correct'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-correct'),
                        'position' : {
                            'left': '238px',
                            'top': '222px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.no-sidewalk.slide-2.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.no-sidewalk.slide-2.description'),
                    'imageURL': 'assets/images/tutorials/no-sidewalk-incorrect-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.no-sidewalk.slide-3.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.no-sidewalk.slide-3.description'),
                    'imageURL': 'assets/images/tutorials/no-sidewalk-incorrect-2.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                }
            ]
        },
        'Crosswalk': {
            'missionInstruction1': i18next.t('mission-tutorial.mission-instruction-1'),
            'missionInstruction2': i18next.t('mission-tutorial.crosswalk.instruction'),
            'slides': [
                {
                    'exampleType': 'correct',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-correct'),
                    'exampleTypeIcon': '#smile-positive',
                    'labelTypeTitle': i18next.t('mission-tutorial.crosswalk.slide-1.title'),
                    'labelTypeSubtitle': '',
                    'labelTypeDescription': i18next.t('mission-tutorial.crosswalk.slide-1.description'),
                    'imageURL': 'assets/images/tutorials/crosswalk-correct-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-correct'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-correct'),
                        'position' : {
                            'left': '238px',
                            'top': '222px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.crosswalk.slide-2.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.crosswalk.slide-2.description'),
                    'imageURL': 'assets/images/tutorials/crosswalk-incorrect-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.crosswalk.slide-3.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.crosswalk.slide-3.description'),
                    'imageURL': 'assets/images/tutorials/crosswalk-incorrect-2.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.crosswalk.slide-4.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.crosswalk.slide-4.description'),
                    'imageURL': 'assets/images/tutorials/crosswalk-incorrect-3.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                }
            ]
        },
        'Signal': {
            'missionInstruction1': i18next.t('mission-tutorial.mission-instruction-1'),
            'missionInstruction2': i18next.t('mission-tutorial.signal.instruction'),
            'slides': [
                {
                    'exampleType': 'correct',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-correct'),
                    'exampleTypeIcon': '#smile-positive',
                    'labelTypeTitle': i18next.t('mission-tutorial.signal.slide-1.title'),
                    'labelTypeSubtitle': '',
                    'labelTypeDescription': i18next.t('mission-tutorial.signal.slide-1.description'),
                    'imageURL': 'assets/images/tutorials/signal-correct-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-correct'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-correct'),
                        'position' : {
                            'left': '238px',
                            'top': '222px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.signal.slide-2.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.signal.slide-2.description'),
                    'imageURL': 'assets/images/tutorials/signal-incorrect-1.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.signal.slide-3.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.signal.slide-3.description'),
                    'imageURL': 'assets/images/tutorials/signal-incorrect-2.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                },
                {
                    'exampleType': 'incorrect',
                    'exampleTypeLabel': i18next.t('mission-tutorial.example-type-label-incorrect'),
                    'exampleTypeIcon': '#smile-negative',
                    'labelTypeTitle': i18next.t('mission-tutorial.signal.slide-4.title'),
                    'labelTypeSubtitle': i18next.t('mission-tutorial.label-type-subtitle'),
                    'labelTypeDescription': i18next.t('mission-tutorial.signal.slide-4.description'),
                    'imageURL': 'assets/images/tutorials/signal-incorrect-3.png',
                    'onImageLabel': {
                        'title': i18next.t('mission-tutorial.on-image-label-title-incorrect'),
                        'description': i18next.t('mission-tutorial.on-image-label-description-incorrect'),
                        'position' : {
                            'left': '466px',
                            'top': '257px'
                        },
                        'size': {
                            'height': '83px',
                            'width': '157px'
                        }
                    }
                }
            ]
        }
    };

    const EXAMPLE_TYPES = {
        CORRECT: 'correct',
        INCORRECT: 'incorrect'
    };

    console.log(param.labelList[0].getAuditProperty('labelType'));

    function getURLParam(name){
        if(name=(new RegExp('[?&]'+encodeURIComponent(name)+'=([^&]*)')).exec(location.search))
            return decodeURIComponent(name[1]);
    }

    let LabelType = param.labelList[0].getAuditProperty('labelType'); // should come as an argument

    if (getURLParam('labelType')) {
        LabelType = getURLParam('labelType');
    }

    let currentSlideIdx = 0;
    let nSlides = 2;

    let module = {};

    // Renders the initial mission screen and initializes the slide deck
    function initModule(LabelType) {

        if (!tutorialDescriptor[LabelType]) {
            // Log here
            console.log('Unknown labelType: ' + LabelType);
        }

        module = tutorialDescriptor[LabelType];
        nSlides = module.slides.length;
    }

    /**
     * Initializes the UI for the mission screens.
     * Renders the top level messages and slide location indicators.
     * Also renders the first slide.
     */
    function initUI() {

        function renderLocationIndicators() {
            const $missionCarouselIndicatorArea = $('.mission-carousel-location-indicator-area');
            for (let i = 0; i < nSlides; i++) {
                const $indicator = $('.mission-carousel-location-indicator.template').clone().removeClass('template');
                $indicator.attr('data-idx', i);
                $missionCarouselIndicatorArea.append($indicator);
            }
        }

        $('.mission-instruction-1').text(module.missionInstruction1);
        $('.mission-instruction-2').text(module.missionInstruction2);

        renderLocationIndicators();
        renderSlide(currentSlideIdx);
    }

    /**
     * Renders the slide for the given idx
     * @param idx
     */
    function renderSlide(idx) {

        function renderOnImageLabel(onImageLabel) {
            $onImageLabel.css({'height': onImageLabel.size.height, 'width': onImageLabel.size.width,
                'top': onImageLabel.position.top, 'left': onImageLabel.position.left});
            $('.on-image-label-type-title', $onImageLabel).html(onImageLabel.title);
            $('.on-image-label-description', $onImageLabel).html(onImageLabel.description);
            $onImageLabel.show();
        }

        const $missionTutorialSlide = $('.mission-tutorial-slide');
        const $labelTypeSubtitle = $('.label-type-subtitle');
        const $mtsImage = $('.mts-image');
        const $onImageLabel = $('.on-image-label');

        // Reset the UI first.
        $('.mission-carousel-location-indicator').removeClass('current-location');
        $missionTutorialSlide.removeClass(EXAMPLE_TYPES.CORRECT).removeClass(EXAMPLE_TYPES.INCORRECT);
        $mtsImage.attr('src', '');
        $labelTypeSubtitle.text('');
        $('.previous-slide-button, .next-slide-button').removeClass('disabled');
        $onImageLabel.hide();

        const slide = module.slides[idx];

        // Adds class for both correct and incorrect examples. Note: the class names should be
        // exactly the same in the descriptor and CSS.
        $missionTutorialSlide.addClass(slide.exampleType);

        $('.example-type-label').text(slide.exampleTypeLabel);
        $('.example-type-icon').find('use').attr('xlink:href', slide.exampleTypeIcon);

        $('.label-type-title').html(slide.labelTypeTitle);
        $('.label-type-description').html(slide.labelTypeDescription);

        if (slide.labelTypeSubtitle) {
            $labelTypeSubtitle.html(slide.labelTypeSubtitle);
        }

        $mtsImage.attr('src', slide.imageURL);

        $(`.mission-carousel-location-indicator[data-idx=${idx}]`).addClass('current-location');

        // If the slide has onImageLabel, then should draw it.
        if (slide.onImageLabel) {
            renderOnImageLabel(slide.onImageLabel);
        }

        // Disable the previous/next buttons based on the current slide idx
        if (idx === 0) {
            $('.previous-slide-button').addClass('disabled');
        } else if (idx === nSlides - 1) {
            $('.next-slide-button').addClass('disabled');
        }
    }

    function attachEventHandlers() {
        $('.previous-slide-button').click(function() {
            currentSlideIdx = Math.max(currentSlideIdx - 1, 0);
            renderSlide(currentSlideIdx);

        });

        $('.next-slide-button').click(function() {
            currentSlideIdx = Math.min(currentSlideIdx + 1, nSlides - 1);
            renderSlide(currentSlideIdx);
        });

        $('.mission-tutorial-done-btn').click(function() {
            $('.mission-tutorial-overlay').fadeOut(100);
        });
    }

    initModule(LabelType);
    initUI();
    attachEventHandlers();

    return this;
}
