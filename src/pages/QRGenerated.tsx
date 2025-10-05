import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Download } from "lucide-react";

const QRGenerated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrCode, setQRCode] = useState<string>("");
  const [caregiverData] = useState(location.state || {});

  useEffect(() => {
    // QR 코드 생성 로직 - 홈 화면으로 이동
    const qrUrl = window.location.origin;
    setQRCode(qrUrl);
  }, []);

  const downloadQR = () => {
    // TODO: 실제 QR 코드 이미지 다운로드 기능
    alert("QR코드 다운로드 기능은 Supabase 연동 후 구현됩니다.");
  };

  if (!caregiverData.caregiverName) {
    return (
      <div className="min-h-screen bg-background p-6 md:p-12 flex items-center justify-center">
        <Card className="p-senior-xl text-center">
          <h2 className="text-senior-xl font-semibold text-foreground mb-4">
            잘못된 접근입니다
          </h2>
          <Button variant="senior-primary" onClick={() => navigate('/')}>
            홈으로 돌아가기
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-senior-xl">
          <h1 className="text-senior-3xl font-bold text-success mb-4">
            QR코드 생성 완료! ✅
          </h1>
          <p className="text-senior-lg text-muted-foreground">
            아래 QR코드를 어르신의 옷에 부착해주세요
          </p>
        </div>

        {/* QR 코드 카드 */}
        <Card className="p-senior-xl text-center mb-senior-lg" id="qr-card">
          {/* 등록 정보 표시 */}
          <div className="bg-accent p-4 rounded-lg mb-senior">
            <h3 className="text-senior-lg font-semibold text-accent-foreground mb-2">
              등록된 정보
            </h3>
            <div className="text-left text-senior-sm text-accent-foreground space-y-1">
              <p><strong>보호자:</strong> {caregiverData.caregiverName}</p>
              <p><strong>연락처:</strong> {caregiverData.phoneNumber}</p>
              {caregiverData.seniorNotes && (
                <p><strong>참고사항:</strong> {caregiverData.seniorNotes}</p>
              )}
            </div>
          </div>

          {/* 실제 QR 코드 */}
          <div id="qr-image-only" className="w-80 h-80 mx-auto mb-4 bg-white p-4 rounded-lg border-2 border-border">
            <QRCode
              value={qrCode}
              size={288}
              level="L"
              fgColor="#000000"
              bgColor="#FFFFFF"
              style={{ 
                height: "auto", 
                maxWidth: "100%", 
                width: "100%",
                imageRendering: "pixelated"
              }}
            />
          </div>

          {/* 다운로드 버튼 */}
          <Button variant="senior-primary" size="senior" onClick={downloadQR} className="w-full text-white mb-3">
            <Download className="mr-2" size={20} />
            QR코드 다운로드
          </Button>
          
          {/* 정보 수정하기 버튼 */}
          <Button 
            variant="outline" 
            size="senior" 
            onClick={() => navigate('/caregiver', { state: caregiverData })}
            className="w-full bg-white text-primary border-primary hover:bg-primary/5"
          >
            정보 수정하기
          </Button>
        </Card>

        {/* 사용법 안내 */}
        <Card className="p-senior bg-primary/5 border-primary/20 mb-senior-xl">
          <h3 className="text-senior-xl font-semibold text-primary mb-4">
            📋 QR 코드 사용 안내
          </h3>
          <div className="text-senior-base text-primary/80 space-y-3">
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold">1.</span>
            <p>QR 코드 의류용 스티커를 어르신이 자주 입으시는 옷이나 신발, 가방, 모자에 부착해주세요</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold">2.</span>
            <p>QR 코드 손톱용 스티커를 어르신의 손톱이나 발톱에 부착해주세요</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-primary font-bold">3.</span>
            <p>QR 코드의 손상 여부를 주기적으로 확인해주세요</p>
          </div>
          </div>
        </Card>

        {/* 하단 버튼 */}
        <div className="text-center">
          <Button 
            variant="senior-ghost" 
            onClick={() => navigate('/')}
            className="mr-4 border-2 border-border"
          >
            홈으로 가기
          </Button>
          <Button 
            variant="senior-secondary" 
            onClick={() => navigate('/caregiver')}
          >
            새 QR코드 만들기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRGenerated;