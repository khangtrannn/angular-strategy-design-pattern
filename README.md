Learning by doing is the best approach to learn stuff

## AsyncPipe under the hood
interface SubscriptionStrategy {
  createSubscription(async: Subscribable<any> | Promise<any>, updateLatestValue: any): Unsubscribale | Promise<any>;

  dispose(subscription: Unsubscribable | Promise<any>): void;
}

class SubscribaleStrategy implements SubscriptionStrategy {
  ...
}

class PromiseStrategy implements SubscriptionStrategy {
  ...
}

// Family of algorithims
const _promiseStrategy = new PromiseStrategy();
const _subscribaleStrategy = new SubscribableStrategy();

@Pipe({
  name: 'async',
  pure: false,
  standalone: true,
})
export class AsyncPipe implements OnDestroy, PipeTransform {
  ...
  private _ref: ChangeDetectorRef | null;

  // Strategy Design Pattern shines here
  // Also dependency inversion here
  private _strategy: SubscriptionStrategy | null = null;

  constructor(ref: ChangeDetectorRef) {
    ...
  }

  // Strategy Design Pattern shines
  private _subscribe(obj: Subscribable<any>|Promise<any>|EventEmitter<any>): void {
    this._obj = obj;
    this._strategy = this._selectStrategy(obj);
    this._subscription = this._strategy.createSubscription(
        obj, (value: Object) => this._updateLatestValue(obj, value));
  }

  private _selectStrategy(obj: Subscribable<any>|Promise<any>|
                          EventEmitter<any>): SubscriptionStrategy {
    if (ɵisPromise(obj)) {
      return _promiseStrategy;
    }

    if (ɵisSubscribable(obj)) {
      return _subscribableStrategy;
    }

    throw invalidPipeArgumentError(AsyncPipe, obj);
  }

  ngOnDestroy(): void {
    ...
  }
}

## References
https://www.youtube.com/watch?v=d25ZFIdMxr4
https://github.com/angular/angular/blob/main/packages/common/src/pipes/async_pipe.ts