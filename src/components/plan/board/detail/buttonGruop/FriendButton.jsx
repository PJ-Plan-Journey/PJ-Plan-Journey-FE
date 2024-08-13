import api from '@axios/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import useStompStore from '@zustands/plan/useStompStore';

const FriendButton = ({ planId }) => {
  const { sendMessage } = useStompStore();

  const getFriend = async () => {
    try {
      const { data } = await api.get(`/friends`);

      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { data: friendList } = useQuery({
    queryKey: ['getFriend'],
    queryFn: getFriend,
  });

  const inviteFriend = async ({ planId, friendId }) => {
    try {
      const { data } = await api.post(`/invites/${planId}`, {
        inviteFriends: [friendId],
      });
      return data;
    } catch (error) {
      console.log({ error });
    }
  };

  const { mutate: inviteFriendMutate } = useMutation({
    mutationKey: ['inviteFriend', planId],
    mutationFn: ({ planId, friendId }) => inviteFriend({ planId, friendId }),
    onSuccess: () => {
      console.log('초대성공');
    },
    onError: () => {
      console.log('초대실패');
    },
  });

  return (
    <div>
      <button>친구</button>
      <ul>
        {friendList &&
          friendList?.data.map((item) => {
            return (
              <div>
                <li>{item.friendNickname}</li>
                <button
                  onClick={() =>
                    inviteFriendMutate({ planId, friendId: item.friendId })
                  }
                >
                  초대
                </button>
              </div>
            );
          })}
      </ul>
    </div>
  );
};

export default FriendButton;
