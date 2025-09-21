import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";

const QRGenerated = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [qrCode, setQRCode] = useState<string>("");
  const [caregiverData] = useState(location.state || {});

  useEffect(() => {
    // QR 코드 생성 로직
    const generateQRCode = () => {
      // QR 코드는 항상 memorycp.com으로 이동
      const qrUrl = "https://www.memorycp.com/";
      setQRCode(qrUrl);
    };

    if (caregiverData.caregiverName) {
      generateQRCode();
    }
  }, [caregiverData]);

  const downloadQR = () => {
    // TODO: 실제 QR 코드 이미지 다운로드 기능
    alert("QR코드 다운로드 기능은 Supabase 연동 후 구현됩니다.");
  };

  const printQR = () => {
    window.print();
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
      <style dangerouslySetInnerHTML={{
        __html: `
          @media print {
            body * {
              visibility: hidden;
            }
            #qr-card, #qr-card * {
              visibility: visible;
            }
            #qr-card {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              background: white !important;
            }
          }
        `
      }} />
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
          <div className="mb-senior">
            {/* 실제 QR 코드 */}
            <div className="w-48 h-48 mx-auto mb-4 bg-white p-4 rounded-lg border-2 border-border">
              <QRCode
                value={qrCode}
                size={176}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            
            <div className="text-senior-sm text-muted-foreground break-all">
              {qrCode}
            </div>
          </div>

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
        </Card>

        {/* 액션 버튼들 */}
        <div className="grid gap-4 md:grid-cols-2 mb-senior-lg">
          <Button variant="senior-primary" size="senior" onClick={downloadQR}>
            📥 QR코드 다운로드
          </Button>
          <Button variant="senior-secondary" size="senior" onClick={printQR}>
            🖨️ QR코드 출력하기
          </Button>
        </div>

        {/* 사용법 안내 */}
        <Card className="p-senior bg-primary/5 border-primary/20">
          <h3 className="text-senior-xl font-semibold text-primary mb-4">
            📋 사용법 안내
          </h3>
          <div className="text-senior-base text-primary/80 space-y-3">
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <p>QR코드를 스티커로 출력하거나 라미네이팅하여 어르신 옷에 부착해주세요</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <p>누군가 QR코드를 스캔하면 연락처가 표시됩니다</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <p>발견자가 쉽게 전화를 걸 수 있습니다</p>
            </div>
          </div>
        </Card>

        {/* 하단 버튼 */}
        <div className="mt-senior-xl text-center">
          <Button 
            variant="senior-ghost" 
            onClick={() => navigate('/')}
            className="mr-4"
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