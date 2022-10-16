define([
    "module",
    "require",
    "vs/platform/instantiation/common/instantiationService",
    "kunst-ui/utils",
    "kunst-ui/activity-bar",
    "kunst-ui/fonts",
    "kunst-ui/title-bar",
], function (module, require, insantiationService, utils, activityBar, fonts, titleBar) {
    'use strict';

    try {
        let addStyleSheet = utils.addStyleSheet;

        let url = require.toUrl(module.id) + ".css";
        if (!url.startsWith("file://") && !url.startsWith("vscode-file://")) {
            url = 'file://' + url;
        }
        addStyleSheet(url);

        class _InstantiationService extends insantiationService.InstantiationService {
            constructor() {
                super(...arguments);

                let service = this;

                let run = function(what) {
                    try {                        
                        what.run(service);                        
                    } catch (e) {
                        console.error(e);
                    }
                };

                run(activityBar);
                run(fonts);                
                run(titleBar);                
            }
        }

        insantiationService.InstantiationService = _InstantiationService;
    } catch (e) {
        console.error('Couldn\'t initialize CustomizeUI', e);
    }
});
