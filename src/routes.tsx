import {setRoutes} from "@features/Router";
import IndexPage from "@pages/IndexPage";

setRoutes(
    [
        {
            type: "public",
            path: "/",
            element: <><IndexPage /></>
        }
    ]
);