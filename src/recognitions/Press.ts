import { AnyTouchEvent } from '../interface';
import {
    STATUS_FAILED, STATUS_RECOGNIZED
} from '../const/recognizerStatus';
import { INPUT_CANCEL, INPUT_END, INPUT_START,AUTO,DIRECTION_UP } from '../const';
import Recognizer from './Base';

export default class PressRecognizer extends Recognizer {
    private _timeoutId?: any;
    static DEFAULT_OPTIONS = {
        name: 'press',
        pointLength: 1,
        positionTolerance: 9,
        minPressTime: 251,
    };
    constructor(options = {}) {
        super(options);
    };

    getTouchAction(): string[] {
        return [AUTO];
    };

    recognize(computed: AnyTouchEvent): void {
        const { eventType, deltaTime } = computed;
        // 1. start阶段
        // 2. 触点数符合
        // 那么等待minPressTime时间后触发press
        if (INPUT_START === eventType && this.test(computed)) {
            // 重置状态
            this._resetStatus();
            // 延迟触发
            this.cancel();
            this._timeoutId = (setTimeout as Window['setTimeout'])(() => {
                this.status = STATUS_RECOGNIZED;
                this.emit(this.options.name, computed);
            }, this.options.minPressTime);
        }

        // 触发pressup条件:
        // 1. end阶段
        // 2. 已识别
        else if (INPUT_END === eventType && STATUS_RECOGNIZED === this.status) {
            this.emit(`${this.options.name}${DIRECTION_UP}`, computed);
        }

        // 一旦不满足必要条件, 触发失败
        // 对应cancel和end阶段
        else if (!this.test(computed) || (this.options.minPressTime > deltaTime && -1 !== [INPUT_END, INPUT_CANCEL].indexOf(eventType))) {
            this.cancel();
            this.status = STATUS_FAILED;
        }

    };

    /**
     * 是否满足:
     * 移动距离不大
     */
    test({ distance, pointLength }: AnyTouchEvent): boolean {
        return this.options.positionTolerance > distance && this.isValidPointLength(pointLength);
    };

    cancel(): void {
        clearTimeout(this._timeoutId);
    }

    afterEmit() { }
};