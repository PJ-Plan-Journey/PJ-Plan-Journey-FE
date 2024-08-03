// src/zustands/friend/useFriendStore.js
import { create } from 'zustand';

// 친구 관리 상태를 정의합니다.
const useFriendStore = create((set) => ({
  // 초기 친구 목록과 친구 요청 목록에 임시 데이터를 추가합니다.
  friends: [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ],
  friendRequests: [
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
    { id: 4, name: 'Dave', email: 'dave@example.com' },
  ],
  addFriendRequest: (friend) =>
    set((state) => ({
      friendRequests: [...state.friendRequests, friend],
    })),
  acceptFriendRequest: (id) =>
    set((state) => {
      const request = state.friendRequests.find((req) => req.id === id);
      if (request) {
        return {
          friends: [...state.friends, request],
          friendRequests: state.friendRequests.filter((req) => req.id !== id),
        };
      }
      return state;
    }),
  rejectFriendRequest: (id) =>
    set((state) => ({
      friendRequests: state.friendRequests.filter((req) => req.id !== id),
    })),
  removeFriend: (id) =>
    set((state) => ({
      friends: state.friends.filter((friend) => friend.id !== id),
    })),
  inviteToEvent: async (id) => {
    const success = await mockSendInvite(id);
    if (success) {
      alert('일정에 초대되었습니다.');
    }
  },
}));

// 가상의 초대 요청을 처리하는 함수
const mockSendInvite = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`User with ID ${id} invited to event.`);
      resolve(true); // 초대 성공
    }, 1000);
  });
};

export default useFriendStore;
