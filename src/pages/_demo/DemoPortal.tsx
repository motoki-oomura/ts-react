import React from 'react';
import _DemoPageLayout from '@pages/_demo/_DemoPageLayout';
import usePortal from '@hooks/usePortal';

const DemoPortal = () => {
    const { renderPortal, showPortal, hiddenPortal } = usePortal('test', {
        initView: true,
    });
    const { renderPortal: renderPortal2, showPortal: showPortal2, hiddenPortal: hiddenPortal2 } = usePortal('test2', { initView: false });

    return (
        <_DemoPageLayout>
            <button onClick={showPortal}>ポータルの表示</button>
            <br />
            {renderPortal(<section onClick={hiddenPortal}>どうもポータルです。私をクリックすると消えます</section>)}
            {renderPortal2(<section onClick={hiddenPortal2}>どうもポータル2です。私をクリックすると消えます</section>)}
            <button onClick={showPortal2}>ポータル２の表示</button>
        </_DemoPageLayout>
    );
};
export default DemoPortal;
