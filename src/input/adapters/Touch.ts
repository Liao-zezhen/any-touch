import { BaseInput, eventType } from '../../interface';
import Adapter from './Abstract';
export default class extends Adapter {
    load(event: TouchEvent):BaseInput {
        // fix: wx下没有targetTouches
        const points = Array.from(event.targetTouches||event.touches).map(({ clientX, clientY }) => ({ clientX, clientY }));
        const changedPoints = Array.from(event.changedTouches).map(({ clientX, clientY }) => ({ clientX, clientY }));
        return {
            eventType: <eventType>event.type.replace('touch', ''),
            changedPoints,
            points,
            nativeEvent: event
        };
    }
}; 