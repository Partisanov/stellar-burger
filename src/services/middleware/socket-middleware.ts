import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
  Middleware,
} from '@reduxjs/toolkit';

import { RootState } from '../store.ts';
import { refreshToken } from '../auth/action.ts';

export type TWsActionTypes<S, R> = {
  connect: ActionCreatorWithPayload<string>;
  disconnect: ActionCreatorWithoutPayload;
  sendMessage?: ActionCreatorWithPayload<S>;
  onConnecting?: ActionCreatorWithoutPayload;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<R>;
};

const RECONNECT_PERIOD = 3000;

export const socketMiddleware = <S, R>(
  wsActions: TWsActionTypes<S, R>,
  withTokenRefresh: boolean = false,
): Middleware<NonNullable<unknown>, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;
    const {
      connect,
      disconnect,
      sendMessage,
      onConnecting,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = wsActions;
    let isConnected = false;
    let reconnectTimer = 0;
    let url = '';

    return (next) => (action) => {
      const { dispatch } = store;

      if (connect.match(action)) {
        socket = new WebSocket(action.payload);
        onConnecting && dispatch(onConnecting());
        url = action.payload;
        isConnected = true;

        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = () => {
          dispatch(onError('Error'));
        };

        socket.onclose = () => {
          dispatch(onClose());

          if (isConnected) {
            reconnectTimer = window.setTimeout(() => {
              dispatch(connect(url));
            }, RECONNECT_PERIOD);
          }
        };

        socket.onmessage = (e) => {
          const { data } = e;

          try {
            const parsedData = JSON.parse(data);

            if (
              withTokenRefresh &&
              parsedData.message === 'Invalid or missing token'
            ) {
              refreshToken()
                .then((refreshData) => {
                  const wssUrl = new URL(url);
                  wssUrl.searchParams.set(
                    'token',
                    refreshData.replace('Bearer ', ''),
                  );
                  dispatch(connect(wssUrl.toString()));
                })
                .catch((err) => {
                  dispatch(onError((err as Error).message));
                });

              dispatch(disconnect());

              return;
            }

            dispatch(onMessage(parsedData));
          } catch (err) {
            dispatch(onError((err as Error).message));
          }
        };
      }

      if (socket && sendMessage?.match(action)) {
        try {
          socket.send(JSON.stringify(action.payload));
        } catch (err) {
          dispatch(onError((err as Error).message));
        }
      }

      if (socket && disconnect.match(action)) {
        clearTimeout(reconnectTimer);
        reconnectTimer = 0;
        isConnected = false;
        socket.close();
        socket = null;
      }

      next(action);
    };
  };
};
