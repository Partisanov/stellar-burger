import { toast } from 'react-toastify';
import {
  initialState,
  orderSlice,
  setIds,
  setTotalAmount,
  setOrderId,
} from './reducer';
import { getOrderByNumber, postOrderDetails } from './action';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('orderSlice reducer', () => {
  it('should return the initial state', () => {
    expect(orderSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should set ids', () => {
    const mockIds = ['id1', 'id2'];
    const state = orderSlice.reducer(initialState, setIds(mockIds));
    expect(state).toEqual({ ...initialState, ids: mockIds });
  });

  it('should set total amount', () => {
    const mockTotal = 1000;
    const state = orderSlice.reducer(initialState, setTotalAmount(mockTotal));
    expect(state).toEqual({ ...initialState, totalAmount: mockTotal });
  });

  it('should set current order id', () => {
    const mockOrderId = 123;
    const state = orderSlice.reducer(initialState, setOrderId(mockOrderId));
    expect(state).toEqual({ ...initialState, currentOrderId: mockOrderId });
  });

  it('should handle postOrderDetails.pending', () => {
    const state = orderSlice.reducer(initialState, {
      type: postOrderDetails.pending.type,
    });
    expect(state).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it('should handle postOrderDetails.fulfilled', () => {
    const mockOrderId = 456;
    const state = orderSlice.reducer(initialState, {
      type: postOrderDetails.fulfilled.type,
      payload: mockOrderId,
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      currentOrderId: mockOrderId,
      error: null,
    });
    expect(toast.success).toHaveBeenCalledWith('Заказ успешно размещен!');
  });

  it('should handle postOrderDetails.rejected', () => {
    const mockErrorMessage = 'Ошибка сети';
    const state = orderSlice.reducer(initialState, {
      type: postOrderDetails.rejected.type,
      error: { message: mockErrorMessage },
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: mockErrorMessage,
    });
    expect(toast.error).toHaveBeenCalledWith('Ошибка при размещении заказа!');
  });

  it('should handle getOrderByNumber.pending', () => {
    const state = orderSlice.reducer(initialState, {
      type: getOrderByNumber.pending.type,
    });
    expect(state).toEqual({ ...initialState, isLoading: true, error: null });
  });

  it('should handle getOrderByNumber.fulfilled', () => {
    const mockOrder = { id: 789, name: 'Тестовый заказ' };
    const state = orderSlice.reducer(initialState, {
      type: getOrderByNumber.fulfilled.type,
      payload: mockOrder,
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      currentOrder: mockOrder,
      error: null,
    });
  });

  it('should handle getOrderByNumber.rejected', () => {
    const mockErrorMessage = 'Ошибка сервера';
    const state = orderSlice.reducer(initialState, {
      type: getOrderByNumber.rejected.type,
      error: { message: mockErrorMessage },
    });
    expect(state).toEqual({
      ...initialState,
      isLoading: false,
      error: mockErrorMessage,
    });
    expect(toast.error).toHaveBeenCalledWith('Ошибка при получении заказа!');
  });
});
