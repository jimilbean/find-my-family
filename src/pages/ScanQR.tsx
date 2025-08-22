import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const ScanQR = () => {
  const navigate = useNavigate();
  const [manualInput, setManualInput] = useState("");

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      // URL에서 QR ID 추출
      const urlParts = manualInput.split('/');
      const qrId = urlParts[urlParts.length - 1];
      navigate(`/contact/${qrId}`);
    }
  };

  const startCameraScanning = () => {
    // 실제로는 QR 스캐너 라이브러리 사용
    alert("카메라 QR 스캔 기능은 추후 구현됩니다. 지금은 수동 입력을 사용해주세요.");
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="mx-auto max-w-2xl">
        {/* 헤더 */}
        <div className="text-center mb-senior-xl">
          <Button 
            variant="senior-ghost" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            ← 돌아가기
          </Button>
          <h1 className="text-senior-3xl font-bold text-foreground mb-4">
            QR코드 스캔하기
          </h1>
          <p className="text-senior-lg text-muted-foreground">
            어르신의 QR코드를 스캔해주세요
          </p>
        </div>

        {/* QR 스캔 방법들 */}
        <div className="space-y-senior">
          {/* 카메라 스캔 */}
          <Card className="p-senior-xl text-center">
            <div className="mb-senior">
              <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-senior-2xl">📷</span>
              </div>
              <h2 className="text-senior-2xl font-semibold text-foreground mb-4">
                카메라로 스캔하기
              </h2>
              <p className="text-senior-base text-muted-foreground mb-senior">
                가장 쉽고 빠른 방법입니다
              </p>
            </div>
            <Button 
              variant="senior-primary" 
              size="senior-lg" 
              onClick={startCameraScanning}
              className="w-full"
            >
              📷 카메라 시작하기
            </Button>
          </Card>

          {/* 구분선 */}
          <div className="text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border"></div>
              </div>
              <div className="relative flex justify-center text-senior-base">
                <span className="bg-background px-4 text-muted-foreground">또는</span>
              </div>
            </div>
          </div>

          {/* 수동 입력 */}
          <Card className="p-senior-xl">
            <div className="text-center mb-senior">
              <div className="w-20 h-20 mx-auto mb-4 bg-secondary/50 rounded-full flex items-center justify-center">
                <span className="text-senior-2xl">✏️</span>
              </div>
              <h2 className="text-senior-xl font-semibold text-foreground mb-4">
                직접 입력하기
              </h2>
              <p className="text-senior-base text-muted-foreground mb-senior">
                QR코드 아래에 적힌 주소를 입력해주세요
              </p>
            </div>

            <div className="space-y-4">
              <Input
                value={manualInput}
                onChange={(e) => setManualInput(e.target.value)}
                placeholder="예: https://example.com/contact/12345"
                className="text-senior-base p-senior"
              />
              <Button 
                variant="senior-secondary" 
                size="senior" 
                onClick={handleManualSubmit}
                disabled={!manualInput.trim()}
                className="w-full"
              >
                확인
              </Button>
            </div>
          </Card>

          {/* 테스트용 링크 */}
          <Card className="p-senior bg-accent/50">
            <h3 className="text-senior-lg font-semibold text-accent-foreground mb-2">
              🔍 테스트해보기
            </h3>
            <p className="text-senior-sm text-accent-foreground mb-4">
              개발 중인 기능을 미리 체험해보실 수 있습니다
            </p>
            <Button 
              variant="senior-ghost" 
              size="senior" 
              onClick={() => navigate('/contact/demo')}
              className="w-full"
            >
              데모 페이지 보기
            </Button>
          </Card>
        </div>

        {/* 하단 안내 */}
        <div className="mt-senior-xl p-senior bg-muted rounded-lg">
          <h3 className="text-senior-base font-semibold text-muted-foreground mb-2">
            💡 사용 팁
          </h3>
          <ul className="text-senior-sm text-muted-foreground space-y-1">
            <li>• QR코드가 잘 보이도록 충분한 조명에서 스캔해주세요</li>
            <li>• 카메라가 작동하지 않으면 직접 입력 방식을 사용해주세요</li>
            <li>• 응급상황 시에는 먼저 119에 신고해주세요</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ScanQR;