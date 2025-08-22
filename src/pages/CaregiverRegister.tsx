import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

const CaregiverRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    caregiverName: '',
    phoneNumber: '',
    seniorNotes: '',
    finderMessage: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    // TODO: Supabase 연동으로 데이터 저장
    console.log('Form data:', formData);
    // QR 코드 생성 페이지로 이동
    navigate('/qr-generated', { state: formData });
  };

  const isFormValid = formData.caregiverName && formData.phoneNumber;

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
            보호자 정보 등록
          </h1>
          <p className="text-senior-lg text-muted-foreground">
            QR코드 생성을 위한 정보를 입력해주세요
          </p>
        </div>

        {/* 등록 폼 */}
        <Card className="p-senior-xl">
          <div className="space-y-senior-lg">
            {/* 보호자 이름 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                보호자 성함 *
              </Label>
              <Input
                value={formData.caregiverName}
                onChange={(e) => handleInputChange('caregiverName', e.target.value)}
                placeholder="예) 김보호"
                className="text-senior-base p-senior"
              />
            </div>

            {/* 전화번호 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                연락처 전화번호 *
              </Label>
              <Input
                value={formData.phoneNumber}
                onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                placeholder="예) 010-1234-5678"
                type="tel"
                className="text-senior-base p-senior"
              />
              <p className="text-senior-sm text-muted-foreground">
                발견자가 연락할 수 있는 전화번호를 입력해주세요
              </p>
            </div>

            {/* 어르신 관련 메모 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                어르신 성함 (선택사항)
              </Label>
              <Input
                value={formData.seniorNotes}
                onChange={(e) => handleInputChange('seniorNotes', e.target.value)}
                placeholder="어르신"
                className="text-senior-base p-senior"
              />
            </div>

            {/* 발견자에게 전할 메시지 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                발견자에게 전할 메시지 (선택사항)
              </Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="gentle" />
                  <Label htmlFor="gentle" className="text-senior-sm">
                    예: 혼자 있으면 불안해하시니 다정하게 말씀해주세요
                  </Label>
                </div>
              </div>
              <Textarea
                value={formData.finderMessage}
                onChange={(e) => handleInputChange('finderMessage', e.target.value)}
                placeholder="어르신의 상황에 맞는 메시지를 입력해주세요"
                rows={3}
                className="text-senior-base p-senior"
              />
              <p className="text-senior-sm text-muted-foreground">
                0/200자
              </p>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-senior">
              <Button 
                variant="senior-primary" 
                size="senior" 
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full"
              >
                QR코드 생성하기
              </Button>
            </div>
          </div>
        </Card>

        {/* 안내 정보 */}
        <Card className="mt-senior-xl p-senior bg-primary/5 border-primary/20">
          <h3 className="text-senior-lg font-semibold text-primary mb-4">
            💡 개인정보 보호 정책
          </h3>
          <div className="text-senior-sm text-primary/80 space-y-2">
            <p>개인정보 보호를 위해 주소, 주민등록번호 등 민감한 개인정보는 입력하지 마세요. 입력하신 정보는 안전하게 암호화되어 저장되며, 응급상황 시에만 사용됩니다.</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CaregiverRegister;