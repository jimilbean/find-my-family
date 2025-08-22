import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useParams } from "react-router-dom";

const ContactInfo = () => {
  const { qrId } = useParams();
  const [contactData, setContactData] = useState<any>(null);
  const [showFullPhone, setShowFullPhone] = useState(false);
  const [locationShared, setLocationShared] = useState(false);

  useEffect(() => {
    // 실제로는 Supabase에서 QR ID로 데이터 조회
    // 지금은 시뮬레이션 데이터
    const mockData = {
      id: qrId,
      caregiverName: "김보호",
      phoneNumber: "010-1234-5678",
      seniorNotes: "혼자 있으면 불안해하십니다. 다정하게 말씀해주세요.",
      maskedPhone: "010-1234-****"
    };
    setContactData(mockData);
  }, [qrId]);

  const handleCall = () => {
    if (contactData?.phoneNumber) {
      window.location.href = `tel:${contactData.phoneNumber}`;
    }
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const message = `어르신을 발견했습니다. 현재 위치: https://maps.google.com/?q=${latitude},${longitude}`;
          
          // SMS 링크 (실제 구현 시 백엔드 API 사용)
          const smsUrl = `sms:${contactData.phoneNumber}?body=${encodeURIComponent(message)}`;
          window.location.href = smsUrl;
          
          setLocationShared(true);
        },
        (error) => {
          alert('위치 정보를 가져올 수 없습니다. 브라우저 설정을 확인해주세요.');
        }
      );
    } else {
      alert('이 브라우저는 위치 서비스를 지원하지 않습니다.');
    }
  };

  if (!contactData) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <Card className="p-senior-xl text-center">
          <div className="mb-4">⏳</div>
          <h2 className="text-senior-xl font-semibold text-foreground">
            정보를 불러오고 있습니다...
          </h2>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-senior-xl">
          <div className="w-16 h-16 mx-auto mb-4 bg-success/10 rounded-full flex items-center justify-center">
            <span className="text-senior-2xl">👴</span>
          </div>
          <h1 className="text-senior-2xl font-bold text-foreground mb-2">
            치매 어르신 발견
          </h1>
          <p className="text-senior-base text-muted-foreground">
            보호자에게 연락해주세요
          </p>
        </div>

        {/* 보호자 정보 카드 */}
        <Card className="p-senior-lg mb-senior">
          <div className="text-center mb-senior">
            <h2 className="text-senior-xl font-semibold text-foreground mb-4">
              보호자 정보
            </h2>
            
            {/* 보호자 이름 */}
            <div className="mb-4">
              <p className="text-senior-sm text-muted-foreground">보호자</p>
              <p className="text-senior-lg font-semibold text-foreground">
                {contactData.caregiverName}
              </p>
            </div>

            {/* 전화번호 */}
            <div className="mb-senior">
              <p className="text-senior-sm text-muted-foreground mb-2">연락처</p>
              <div 
                className="bg-accent p-4 rounded-lg cursor-pointer hover:bg-accent/80 transition-colors"
                onClick={() => setShowFullPhone(true)}
              >
                <p className="text-senior-lg font-bold text-accent-foreground">
                  {showFullPhone ? contactData.phoneNumber : contactData.maskedPhone}
                </p>
                {!showFullPhone && (
                  <p className="text-senior-sm text-accent-foreground/60">
                    번호 전체 보기 (터치하세요)
                  </p>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* 어르신 관련 메모 */}
        {contactData.seniorNotes && (
          <Card className="p-senior mb-senior bg-primary/5 border-primary/20">
            <h3 className="text-senior-base font-semibold text-primary mb-2">
              💡 참고사항
            </h3>
            <p className="text-senior-sm text-primary/80">
              {contactData.seniorNotes}
            </p>
          </Card>
        )}

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          {/* 전화하기 버튼 */}
          <Button 
            variant="senior-success" 
            size="senior-lg" 
            onClick={handleCall}
            className="w-full"
          >
            📞 보호자에게 전화하기
          </Button>

          {/* 위치 공유 버튼 */}
          <Button 
            variant="senior-secondary" 
            size="senior" 
            onClick={shareLocation}
            disabled={locationShared}
            className="w-full"
          >
            📍 현재 위치 문자전송
          </Button>
          
          {/* 사진 촬영 버튼 */}
          <Button 
            variant="outline" 
            size="senior" 
            className="w-full"
          >
            📷 사진 촬영하기
          </Button>
        </div>

        {/* 응급 상황 안내 */}
        <Card className="mt-senior bg-destructive/10 border-destructive/20">
          <div className="p-senior text-center">
            <h3 className="text-senior-lg font-semibold text-destructive mb-2">
              응급 상황 시
            </h3>
            <p className="text-senior-sm text-destructive/80 mb-4">
              어르신의 의식을 잃었거나 심각한 부상이 의심될 경우:
            </p>
            <Button 
              variant="destructive" 
              size="senior-lg"
              onClick={() => window.location.href = 'tel:119'}
              className="w-full"
            >
              119 신고하기
            </Button>
            <p className="text-senior-xs text-destructive/60 mt-2">
              생명이 위험한 응급상황에서는 119에 먼저 신고해주세요
            </p>
          </div>
        </Card>

        {/* 사진 촬영 안내 */}
        <Card className="mt-4 p-senior bg-muted">
          <h3 className="text-senior-base font-semibold text-muted-foreground mb-2">
            사진 촬영
          </h3>
          <p className="text-senior-sm text-muted-foreground mb-4">
            사진을 촬영하여 위치정보와 함께 보호자에게 전송하세요
          </p>
          
          <div className="w-full h-32 bg-background border-2 border-dashed border-border rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-2xl mb-2">📷</div>
              <p className="text-senior-sm text-muted-foreground">
                카메라로 촬영하거나<br />갤러리에서 선택하세요
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">
              📷 카메라로 촬영하기
            </Button>
            <Button variant="outline" size="sm">
              📱 갤러리에서 선택하기
            </Button>
          </div>
        </Card>

        {/* 안내 메시지 */}
        <div className="mt-senior-xl p-senior bg-muted rounded-lg">
          <h3 className="text-senior-base font-semibold text-muted-foreground mb-2">
            🙏 발견해주셔서 감사합니다
          </h3>
          <p className="text-senior-sm text-muted-foreground">
            어르신이 집으로 안전하게 돌아갈 수 있도록 도와주셔서 정말 고맙습니다. 
            보호자가 곧 연락드릴 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;