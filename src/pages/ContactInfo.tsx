import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useParams, useNavigate } from "react-router-dom";
import { Phone, MessageSquare, Camera, Eye, X } from "lucide-react";

const ContactInfo = () => {
  const { qrId } = useParams();
  const navigate = useNavigate();
  const [contactData, setContactData] = useState<any>(null);
  const [showFullPhone, setShowFullPhone] = useState(false);
  const [locationShared, setLocationShared] = useState(false);
  const [showCallDialog, setShowCallDialog] = useState(false);

  useEffect(() => {
    // 실제로는 Supabase에서 QR ID로 데이터 조회
    // 지금은 시뮬레이션 데이터
    const mockData = {
      id: qrId,
      caregiverName: "김영희",
      phoneNumber: "010-1234-5678",
      seniorNotes: "혼자 있으면 불안해하시니 다정하게 말씀해주세요. 당뇨가 있으셔서 단 것을 드시면 안됩니다.",
      maskedPhone: "010-****-5678"
    };
    setContactData(mockData);
  }, [qrId]);

  const handleCallClick = () => {
    setShowCallDialog(true);
  };

  const handleCall = () => {
    if (contactData?.phoneNumber) {
      window.location.href = `tel:${contactData.phoneNumber}`;
    }
    setShowCallDialog(false);
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
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-md">
        {/* 헤더 */}
        <div className="text-center mb-senior-lg">
          <h1 className="text-senior-2xl font-bold text-primary mb-2">
            김할머니를 발견하셨군요
          </h1>
          <p className="text-senior-base text-muted-foreground">
            아래 연락처로 보호자에게 즉시 연락해주세요
          </p>
        </div>

        {/* 보호자 연락처 */}
        <div className="mb-senior">
          <h2 className="text-senior-lg font-semibold text-foreground mb-4 text-center">
            보호자 연락처
          </h2>
          
          {/* 보호자 이름 */}
          <div className="mb-4 text-center">
            <p className="text-senior-sm text-muted-foreground mb-1">보호자: {contactData.caregiverName}</p>
          </div>

          {/* 전화번호 */}
          <div className="flex items-center justify-center mb-senior">
            <Phone className="w-5 h-5 text-primary mr-2" />
            <div 
              className="cursor-pointer flex items-center"
              onClick={() => setShowFullPhone(!showFullPhone)}
            >
              <span className="text-senior-xl font-bold text-primary mr-2">
                {showFullPhone ? contactData.phoneNumber : contactData.maskedPhone}
              </span>
              {!showFullPhone && <Eye className="w-4 h-4 text-muted-foreground" />}
            </div>
          </div>
        </div>

        {/* 보호자 메시지 */}
        {contactData.seniorNotes && (
          <div className="mb-senior">
            <div className="bg-muted p-4 rounded-lg">
              <div className="flex items-start">
                <span className="text-primary mr-2 mt-1">📝</span>
                <div>
                  <h3 className="text-senior-sm font-medium text-muted-foreground mb-1">보호자 메시지</h3>
                  <p className="text-senior-sm text-muted-foreground">
                    {contactData.seniorNotes}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 액션 버튼들 */}
        <div className="space-y-3 mb-senior">
          {/* 전화하기 버튼 */}
          <Button 
            variant="senior-primary" 
            size="senior-lg" 
            onClick={handleCallClick}
            className="w-full !text-white"
          >
            <Phone className="w-5 h-5 mr-2" />
            보호자에게 전화하기
          </Button>

          {/* 위치 공유 버튼 */}
          <Button 
            variant="outline" 
            size="senior-lg" 
            onClick={shareLocation}
            disabled={locationShared}
            className="w-full border-primary text-primary hover:bg-primary/10"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            보호자에게 문자하기
          </Button>
          
          {/* 사진 촬영 버튼 */}
          <Button 
            variant="outline" 
            size="senior-lg" 
            className="w-full border-primary text-primary hover:bg-primary/10"
          >
            <Camera className="w-5 h-5 mr-2" />
            사진과 위치정보 전송하기
          </Button>
        </div>

        {/* 응급 상황 안내 */}
        <Card className="mb-senior bg-destructive/10 border-destructive/20">
          <div className="p-senior text-center">
            <h3 className="text-senior-lg font-semibold text-destructive mb-2">
              응급 상황 시
            </h3>
            <p className="text-senior-xs text-muted-foreground mb-4">
              어르신이 의식을 잃었거나 심각한 부상이 의심될 경우
            </p>
            <Button 
              variant="destructive" 
              size="senior-lg"
              onClick={() => window.location.href = 'tel:119'}
              className="w-full"
            >
              119 신고하기
            </Button>
            <p className="text-senior-xs text-muted-foreground mt-2">
              생명이 위험한 응급상황에서는 119에 먼저 신고해주세요
            </p>
          </div>
        </Card>

        {/* 다른 QR 코드 스캔하기 */}
        <div className="text-center">
          <button 
            onClick={() => navigate('/scan')}
            className="text-senior-base text-muted-foreground hover:text-foreground underline"
          >
            다른 QR 코드 스캔하기
          </button>
        </div>
      </div>

      {/* 전화 동의 확인 팝업 */}
      <AlertDialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <AlertDialogContent className="max-w-md">
          <button
            onClick={() => setShowCallDialog(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">닫기</span>
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-senior-lg text-center pt-6">
              본인의 전화번호가 보호자에게 노출되는 것에 동의합니까?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-senior-base text-center mt-4">
              동의하시면 보호자에게 전화하기
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col space-y-2 sm:space-y-2">
            <AlertDialogAction
              onClick={handleCall}
              className="w-full bg-primary hover:bg-primary/90 !text-white text-senior-base py-6"
            >
              보호자에게 전화하기
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ContactInfo;