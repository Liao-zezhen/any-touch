import TouchSimulator from './utils/TouchSimulator';
import sleep from './utils/sleep';
import AnyTouch from '../src/main'

test('仅有tap识别, 事件是否触发', async (done) => {
    const el = document.createElement('div');
    const at = new AnyTouch(el);
    at.on('tap', (e: any) => {
        expect(e.type).toBe('tap');
    });
    const ts = new TouchSimulator(el);
    // 模拟touch触碰
    ts.dispatchTouchStart([{ x: 0, y: 0 }]);
    await sleep(100);
    ts.dispatchTouchEnd();
    await sleep(100);
    done();
});

test('tap与doubletap之间的requireFailure是否生效?', async (done) => {
    const el = document.createElement('div');
    const at = new AnyTouch(el);
    const tap2 = at.get('doubletap');
    if(undefined === tap2) return
    tap2.disabled = false;

    at.on('doubletap', (e) => {
        expect(e.type).toBe('doubletap');
        done();
    });

    const ts = new TouchSimulator(el);
    // 模拟touch触碰
    ts.dispatchTouchStart([{ x: 0, y: 0 }]);
    ts.dispatchTouchEnd();

    await sleep(10);
    ts.dispatchTouchStart([{ x: 0, y: 0 }]);
    ts.dispatchTouchEnd();
});



test('连续点击3下, 第三下, 不符合连击要求, 触发1次双击且触发一次单击', async(done)=>{
    const mockTapCallback = jest.fn();
    const mockDoubletapCallback = jest.fn();
    const el = document.createElement('div');
    const at = new AnyTouch(el);
    const tap2 = at.get('doubletap');
    if(undefined === tap2) return
    tap2.disabled = false;
    const tap1 = at.get('tap');
    if(undefined === tap1) return
    tap1.requireFailure(tap2);

    at.on('tap', (e) => {
        mockTapCallback();
    });

    at.on('doubletap', (e) => {
        mockDoubletapCallback();
    });


    const ts = new TouchSimulator(el);
    // 模拟touch触碰
    ts.dispatchTouchStart([{ x: 0, y: 0 }]);
    ts.dispatchTouchEnd();

    await sleep(10);
    ts.dispatchTouchStart([{ x: 0, y: 0 }]);
    ts.dispatchTouchEnd();

    // 点击更远的距离, 让不符合连击
    await sleep(10);
    ts.dispatchTouchStart([{ x: 100, y: 100 }]);
    ts.dispatchTouchEnd();

    await sleep(310);
    expect(mockDoubletapCallback.mock.calls.length).toBe(1);
    expect(mockTapCallback.mock.calls.length).toBe(1);
    done();
});