import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { QrCode, Camera, Upload, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Html5QrcodeScanner, Html5Qrcode } from "html5-qrcode";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const ScanQR = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [manualInput, setManualInput] = useState("");
  const [showScanDialog, setShowScanDialog] = useState(false);
  const [showCameraDialog, setShowCameraDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const handleManualSubmit = () => {
    if (manualInput.trim()) {
      const urlParts = manualInput.split('/');
      const qrId = urlParts[urlParts.length - 1];
      navigate(`/contact/${qrId}`);
    }
  };

  const processQRResult = (decodedText: string) => {
    try {
      // URL에서 QR ID 추출
      const urlParts = decodedText.split('/');
      const qrId = urlParts[urlParts.length - 1];
      
      toast({
        title: "QR 코드 인식 성공",
        description: "보호자 정보 페이지로 이동합니다.",
      });
      
      navigate(`/contact/${qrId}`);
    } catch (error) {
      toast({
        title: "오류",
        description: "유효하지 않은 QR 코드입니다.",
        variant: "destructive",
      });
    }
  };

  const handleScanClick = () => {
    if (isMobile) {
      setShowScanDialog(true);
    } else {
      handlePhotoUpload();
    }
  };

  const handleCameraScanning = () => {
    setShowScanDialog(false);
    setShowCameraDialog(true);
    
    // 카메라 스캐너 초기화
    setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "camera-scanner-region",
        { 
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
        },
        false
      );
      
      scanner.render(
        (decodedText) => {
          scanner.clear();
          setShowCameraDialog(false);
          processQRResult(decodedText);
        },
        (error) => {
          // 스캔 실패는 무시 (계속 시도)
        }
      );
      
      scannerRef.current = scanner;
    }, 100);
  };

  const handlePhotoUpload = () => {
    setShowScanDialog(false);
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      const decodedText = await html5QrCode.scanFile(file, true);
      processQRResult(decodedText);
    } catch (error) {
      toast({
        title: "오류",
        description: "QR 코드를 인식할 수 없습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
    }
    
    // 파일 입력 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCloseCameraDialog = () => {
    if (scannerRef.current) {
      scannerRef.current.clear();
      scannerRef.current = null;
    }
    setShowCameraDialog(false);
  };

  return (
    <div className="min-h-screen bg-background p-6 md:p-12">
      <div className="mx-auto max-w-md">
        {/* 헤더 */}
        <div className="text-left mb-senior-xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 p-0 h-auto text-senior-base"
          >
            ← 돌아가기
          </Button>
        </div>

        {/* QR 코드 스캔 영역 */}
        <Card className="p-senior-xl text-center">
          <h1 className="text-senior-2xl font-semibold text-foreground mb-2">
            QR 코드를 스캔해주세요
          </h1>
          <p className="text-senior-base text-muted-foreground mb-senior-lg">
            어르신의 QR 코드를 카메라로 스캔하여 보호자 정보를 확인하세요
          </p>
          
          {/* QR 스캔 영역 시뮬레이션 */}
          <div className="w-64 h-64 mx-auto mb-senior bg-muted border-2 border-dashed border-border rounded-lg flex items-center justify-center">
            <div className="text-center">
              <QrCode className="w-16 h-16 mx-auto text-muted-foreground" />
            </div>
          </div>
          
          <Button 
            variant="senior-primary" 
            size="senior-lg" 
            onClick={handleScanClick}
            className="w-full mb-senior"
          >
            QR 코드 스캔하기
          </Button>
          
          <div className="bg-accent/50 p-4 rounded-lg text-left">
            <h3 className="text-senior-base font-semibold text-accent-foreground mb-2">
              스캔 전 확인사항:
            </h3>
            <ul className="text-senior-sm text-accent-foreground space-y-1">
              <li>• QR 코드가 선명하게 보이는지 확인하세요</li>
              <li>• 충분한 조명이 있는 곳에서 스캔해주세요</li>
              <li>• 카메라와 QR 코드 사이의 거리를 조절하세요</li>
            </ul>
          </div>
        </Card>

        <div className="space-y-senior">
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

      {/* 숨겨진 파일 입력 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />
      
      {/* QR 리더 (숨김) */}
      <div id="qr-reader" className="hidden"></div>

      {/* QR 스캔 방식 선택 다이얼로그 (모바일만) */}
      <AlertDialog open={showScanDialog} onOpenChange={setShowScanDialog}>
        <AlertDialogContent className="max-w-md">
          <button
            onClick={() => setShowScanDialog(false)}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">닫기</span>
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-senior-lg text-center pt-6">
              QR 스캔 방식을 선택하세요
            </AlertDialogTitle>
            <AlertDialogDescription className="text-senior-base text-center mt-4">
              카메라로 직접 스캔하거나 사진을 업로드할 수 있습니다
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col space-y-2 sm:space-y-2">
            <AlertDialogAction
              onClick={handleCameraScanning}
              className="w-full bg-primary hover:bg-primary/90 !text-white text-senior-base py-6"
            >
              <Camera className="w-5 h-5 mr-2" />
              카메라
            </AlertDialogAction>
            <AlertDialogAction
              onClick={handlePhotoUpload}
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-senior-base py-6"
            >
              <Upload className="w-5 h-5 mr-2" />
              사진 업로드
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 카메라 스캐너 다이얼로그 */}
      <AlertDialog open={showCameraDialog} onOpenChange={handleCloseCameraDialog}>
        <AlertDialogContent className="max-w-lg">
          <button
            onClick={handleCloseCameraDialog}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 z-10"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">닫기</span>
          </button>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-senior-lg text-center pt-6">
              QR 코드를 카메라에 비춰주세요
            </AlertDialogTitle>
            <AlertDialogDescription className="text-senior-base text-center mt-2">
              QR 코드가 화면 중앙에 오도록 맞춰주세요
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div id="camera-scanner-region" className="w-full"></div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ScanQR;