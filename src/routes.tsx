import {setRoutes, setTypeRoutes} from "@features/Router";
import IndexPage from "@pages/IndexPage";

// demo
import DemoInfiniteScroll from "@pages/_demo/DemoInfiniteScroll";
import DemoPortal from "@pages/_demo/DemoPortal";
import DemoApi from "@pages/_demo/DemoApi";

setRoutes(
    [
        {
            type: "public",
            path: "/",
            element: <><IndexPage /></>
        }
    ]
);

setTypeRoutes('_demo', [
    {
        path: '/_demo/infinite-scroll',
        element: <><DemoInfiniteScroll /></>
    },
    {
        path: '/_demo/portal',
        element: <><DemoPortal /></>
    },
    {
        path: '/_demo/api',
        element: <><DemoApi /></>
    }
]);