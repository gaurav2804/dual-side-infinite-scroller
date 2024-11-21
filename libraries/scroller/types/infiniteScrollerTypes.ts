export interface InfiniteScrollerProps {
  hasMoreBottom: boolean;
  hasMoreTop: boolean;
  bottomCallback: CallbackFunction;
  topCallback: CallbackFunction;
  dataLength: number;
  scrollableTarget?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackFunction = () => any;
