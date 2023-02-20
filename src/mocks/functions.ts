import {IS_DEVELOPMENT} from "@constants/env";

export const initMockBrowser = () => {
    if (IS_DEVELOPMENT) {
        import('./browser').then(module => {
            module.worker.start()
        })
    }
};
