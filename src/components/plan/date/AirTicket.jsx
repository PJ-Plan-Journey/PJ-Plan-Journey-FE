import { formatDate } from '@/utils/formatDate';
import Button from '@components/common/Button';

const AirTicket = ({ dates }) => {
  const onClickTicketing = () => {
    const origin = 'SEL'; // 출발지 (IATA 코드)
    const destination = 'PUS'; // 도착지 (IATA 코드)
    const formattedStartDate = formatDate('yyyyMMdd', dates?.startDate);
    const formattedEndDate = formatDate('yyyyMMdd', dates?.endDate);
    const naverFlightsUrl = `https://flight.naver.com/flights/domestic/${origin}-${destination}-${formattedStartDate}/${destination}-${origin}-${formattedEndDate}?adult=1&fareType=YC`;

    window.open(naverFlightsUrl, '_blank');
  };

  return (
    <div>
      <Button onClick={onClickTicketing} variant="outline">
        항공권 알아보기
      </Button>
    </div>
  );
};

export default AirTicket;
