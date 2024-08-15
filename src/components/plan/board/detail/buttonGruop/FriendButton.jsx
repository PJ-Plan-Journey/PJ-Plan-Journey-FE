import Portal from '@/utils/Portal';
import api from '@axios/api';
import { flex, flexColumn } from '@styles/common/common.style';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FriendButton = ({ planId }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const toggleFriendModal = () => {
    setIsVisible((prev) => !prev);
  };

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
      setMessage('초대성공하였습니다.');
    },
    onError: () => {
      setMessage('초대실패하였습니다.');
    },
  });

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage('');
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <>
      <button onClick={toggleFriendModal}>친구</button>

      <Portal>
        {isVisible && (
          <FriendButtonModal>
            <div className="background" onClick={toggleFriendModal} />
            {message && <div className="message">{message}</div>}

            <div className="modal">
              <div className="title">친구목록</div>
              <ul className="list">
                {friendList?.data.content.map((item) => (
                  <div key={item.friendNickname} className="item">
                    <li>{item.friendNickname}</li>
                    <button
                      onClick={() =>
                        inviteFriendMutate({ planId, friendId: item.friendId })
                      }
                    >
                      초대
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </FriendButtonModal>
        )}
      </Portal>
    </>
  );
};

export default FriendButton;

const FriendButtonModal = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: 6;

  .background {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .modal {
    ${flexColumn}
    background-color: white;
    width: 300px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-shadow: 0 0 2px black;
    border-radius: 20px;
  }

  .message {
    ${flex}
    background-color: white;
    width: 300px;
    position: absolute;
    top: 20%;
    left: 50%;
    z-index: 7;
    transform: translate(-50%, -50%);
    padding: 20px;
    box-shadow: 0 0 2px black;
    border-radius: 10px;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    padding-bottom: 20px;
  }

  .list {
    ${flexColumn}
    width: 100%;
    min-height: 200px;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px 0;
    overflow: hidden;
  }

  .item {
    ${flex}
    justify-content: space-between;
    width: 100%;
    padding: 10px 20px;

    button {
      cursor: pointer;
      border: 1px solid blue;
      color: blue;
      border-radius: 10px;
      padding: 3px 10px;
      background-color: transparent;

      &:hover {
        background-color: blue;
        color: white;
      }
    }

    &:hover {
      background-color: #f6f6f6;
    }
  }
`;
