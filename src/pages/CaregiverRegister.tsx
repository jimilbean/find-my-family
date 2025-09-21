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
    seniorName: '',
    finderMessage: ''
  });
  const [messageLength, setMessageLength] = useState(0);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === 'finderMessage') {
      setMessageLength(value.length);
    }
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
        <div className="mb-senior-xl">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-4 p-0 h-auto text-senior-base"
          >
            ← 보호자 등록
          </Button>
        </div>

        {/* 등록 폼 */}
        <Card className="p-senior-xl">
          <div className="mb-senior-lg">
            <h1 className="text-senior-2xl font-bold text-foreground mb-2">
              보호자 정보 입력
            </h1>
            <p className="text-senior-base text-muted-foreground">
              QR 코드 생성을 위한 기본 정보를 입력해주세요
            </p>
          </div>

          <div className="space-y-senior-lg">
            {/* 보호자 성함 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                보호자 성함 *
              </Label>
              <Input
                value={formData.caregiverName}
                onChange={(e) => handleInputChange('caregiverName', e.target.value)}
                placeholder="홍길동"
                className="text-senior-base p-senior"
              />
            </div>

            {/* 보호자 연락처 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                보호자 연락처 *
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  📞
                </div>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                  placeholder="010-1234-5678"
                  type="tel"
                  className="text-senior-base p-senior pl-12"
                />
              </div>
            </div>

            {/* 어르신 성함 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                어르신 성함 (선택사항)
              </Label>
              <Input
                value={formData.seniorName}
                onChange={(e) => handleInputChange('seniorName', e.target.value)}
                placeholder="주종준"
                className="text-senior-base p-senior"
              />
            </div>

            {/* 발견자에게 전할 메시지 */}
            <div className="space-y-3">
              <Label className="text-senior-base font-semibold">
                발견자에게 전할 메시지 (선택사항)
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-muted-foreground">
                  💬
                </div>
                <Textarea
                  value={formData.finderMessage}
                  onChange={(e) => handleInputChange('finderMessage', e.target.value)}
                  placeholder="예: 혼자 있으면 불안해하시니 다정하게 말씀해주세요"
                  rows={4}
                  maxLength={200}
                  className="text-senior-base p-senior pl-12 resize-none"
                />
              </div>
              <p className="text-senior-sm text-muted-foreground text-right">
                {messageLength}/200자
              </p>
            </div>

            {/* 개인정보 보호 안내 */}
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
              <p className="text-senior-sm text-primary/80">
                <strong>개인정보 보호:</strong> 주소, 주민등록번호 등 민감한 정보는 입력하지 마세요. 
                입력하신 정보는 안전하게 암호화되어 저장되며, 응급상황에서만 사용됩니다.
              </p>
            </div>

            {/* 제출 버튼 */}
            <div className="pt-senior">
              <Button 
                variant="senior-primary" 
                size="senior-lg" 
                onClick={handleSubmit}
                disabled={!isFormValid}
                className="w-full"
              >
                QR 코드 생성하기
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CaregiverRegister;