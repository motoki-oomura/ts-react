import {setRoutes, setTypeRoutes} from "@features/Router";
import IndexPage from "@pages/IndexPage";

// demo
import DemoInfiniteScroll from "@pages/_demo/InfiniteScroll";

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
    }
]);