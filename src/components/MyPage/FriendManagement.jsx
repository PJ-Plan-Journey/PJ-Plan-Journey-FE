import React, { useState } from 'react';
import * as S from '@styles/mypage/FriendManagement.styles';
import { FaCheck, FaTrash } from 'react-icons/fa';
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from '@tanstack/react-query';
import api from '@axios/api';
import { useNavigate } from 'react-router-dom';

const FriendManagement = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [friendEmail, setFriendEmail] = useState('');

  // 친구 요청 받은 목록 가져오기 (페이징 처리)
  const {
    data: friendRequestsData,
    isLoading: isRequestsLoading,
    fetchNextPage: fetchNextFriendRequestsPage,
    hasNextPage: hasNextFriendRequestsPage,
    isError: isRequestsError,
    error: friendRequestsError,
  } = useInfiniteQuery({
    queryKey: ['friendRequests'],
    queryFn: ({ pageParam = 0 }) =>
      api.get(`/friends/receivedLists?page=${pageParam}&size=5`).then((res) => {
        return {
          data: res.data.data.content, // 응답 데이터의 content
          nextPage: pageParam + 1, // 다음 페이지 번호
          isLast: res.data.data.content.length === 0, // 데이터가 없는지 확인
        };
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    onError: (error) => {
      console.log('친구 요청 목록을 불러오는 중 오류가 발생했습니다:', error);
    },
  });

  // 친구 목록 가져오기 (페이징 처리)
  const {
    data: friendsData,
    isLoading: isFriendsLoading,
    fetchNextPage: fetchNextFriendsPage,
    hasNextPage: hasNextFriendsPage,
    isError: isFriendsError,
    error: friendsError,
  } = useInfiniteQuery({
    queryKey: ['friends'],
    queryFn: ({ pageParam = 0 }) =>
      api.get(`/friends?page=${pageParam}&size=5`).then((res) => {
        console.log(res);
        return {
          data: res.data.data.content, // 응답 데이터의 content
          nextPage: pageParam + 1, // 다음 페이지 번호
          isLast: res.data.data.content.length === 0, // 데이터가 없는지 확인
        };
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.isLast ? undefined : lastPage.nextPage;
    },
    onError: (error) => {
      console.log('친구 목록을 불러오는 중 오류가 발생했습니다:', error);
    },
  });

  // 친구 요청 수락
  const acceptFriendMutation = useMutation({
    mutationFn: (id) => api.post(`/friends/accept/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
      queryClient.invalidateQueries(['friends']);
    },
    onError: (error) => {
      console.log('친구 요청 수락 실패:', error);
      alert('친구 요청 수락에 실패했습니다.');
    },
  });

  // 친구 요청 거절
  const rejectFriendMutation = useMutation({
    mutationFn: (id) => api.post(`/friends/reject/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['friendRequests']);
    },
    onError: (error) => {
      console.log('친구 요청 거절 실패:', error);
      alert('친구 요청 거절에 실패했습니다.');
    },
  });

  // 친구 삭제
  const removeFriendMutation = useMutation({
    mutationFn: (id) => api.delete(`/friends/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['friends']);
    },
    onError: (error) => {
      console.log('친구 삭제 실패:', error);
      alert('친구 삭제에 실패했습니다.');
    },
  });

  // 친구 추가
  const addFriendMutation = useMutation({
    mutationFn: () =>
      api.post('/friends/request', { receiverEmail: friendEmail }),
    onSuccess: () => {
      alert('친구 요청을 성공적으로 보냈습니다.');
      setFriendEmail('');
    },
    onError: (error) => {
      console.log('친구 요청 실패:', error);
      alert('친구 요청에 실패했습니다.');
    },
  });

  console.log('Has Next Friend Requests Page:', hasNextFriendRequestsPage);
  console.log('Has Next Friends Page:', hasNextFriendsPage);

  const handleAddFriend = (e) => {
    e.preventDefault();
    const trimmedEmail = friendEmail.trim();
    addFriendMutation.mutate({ receiverEmail: trimmedEmail });
  };

  // 데이터가 없는 경우 기본값 처리 및 접근 수정
  const friendRequests =
    friendRequestsData?.pages?.flatMap((page) => page?.data?.content) || [];
  const friends =
    friendsData?.pages?.flatMap((page) => page?.data?.content) || [];
    console.log(friendRequests)
  return (
    <S.FriendContainer>
      <S.AddFriendSection>
        <S.Input
          type="email"
          placeholder="친구 이메일을 입력하세요"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
        />
        <S.Button onClick={handleAddFriend}>친구 추가</S.Button>
      </S.AddFriendSection>

      <S.LoginText>친구 요청</S.LoginText>
      {isRequestsLoading ? (
        <S.ErrorMessage>Loading friend requests...</S.ErrorMessage>
      ) : friendRequests.length > 0 ? (
        <>
          {friendRequestsData?.pages.map((user) => (
            user.data.map((user) => (
              <S.FriendRequestContainer key={user?.friendRequestId}>
              <div>
                <strong>{user?.senderNickname || 'No Nickname'} 님</strong>
              </div>
              <S.FriendRequestActions>
                <FaCheck
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    acceptFriendMutation.mutate(user.friendRequestId)
                  }
                />
                <FaTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    rejectFriendMutation.mutate(user.friendRequestId)
                  }
                />
              </S.FriendRequestActions>
            </S.FriendRequestContainer>
            ))
          ))}
          {hasNextFriendRequestsPage && (
            <S.LoadMoreButton onClick={() => fetchNextFriendRequestsPage()}>
              더 불러오기
            </S.LoadMoreButton>
          )}
        </>
      ) : (
        <S.ErrorMessage>No friend requests available</S.ErrorMessage>
      )}

      <S.LoginText>친구 목록</S.LoginText>
      {isFriendsLoading ? (
        <S.ErrorMessage>Loading friends...</S.ErrorMessage>
      ) : friends.length > 0 ? (
        <>
          {friendsData?.pages.map((page) => (
            page.data.map((user) => (
              <S.FriendContainerInner key={user?.friendId}>
              <div>
                <strong>{user?.friendNickname || 'No Nickname'} 님</strong>
              </div>
              <S.FriendActions>
                <FaTrash
                  style={{ cursor: 'pointer' }}
                  onClick={() => removeFriendMutation.mutate(user.friendId)}
                />
              </S.FriendActions>
            </S.FriendContainerInner>
            ))
           
          ))}
          {hasNextFriendsPage && (
            <S.LoadMoreButton onClick={() => fetchNextFriendsPage()}>
              더 불러오기
            </S.LoadMoreButton>
          )}
        </>
      ) : (
        <S.ErrorMessage>No friends found</S.ErrorMessage>
      )}
    </S.FriendContainer>
  );
};

export default FriendManagement;
