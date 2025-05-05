
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "../components/Layout";

const Terms = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          &larr; 戻る
        </Button>
        
        <div className="bg-card border border-border rounded-lg p-6 md:p-8">
          <h1 className="text-3xl font-bold mb-6">利用規約</h1>
          
          <div className="prose prose-sm md:prose-base max-w-none">
            <p>
              この利用規約（以下，「本規約」といいます。）は，Grad Connect（以下，「当サービス」といいます。）の利用条件を定めるものです。
              登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，当サービスをご利用いただきます。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第1条（適用）</h2>
            <p>
              本規約は，ユーザーと当サービス提供者との間の当サービスの利用に関わる一切の関係に適用されるものとします。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第2条（利用登録）</h2>
            <p>
              登録希望者が当サービスの定める方法によって利用登録を申請し，当サービスがこれを承認することによって，利用登録が完了するものとします。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第3条（禁止事項）</h2>
            <p>
              ユーザーは，当サービスの利用にあたり，以下の行為をしてはなりません。
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当サービスの運営を妨害する行為</li>
              <li>他のユーザーに不利益，損害，不快感を与える行為</li>
              <li>他のユーザーに対する嫌がらせや誹謗中傷</li>
              <li>当サービスが許可しない広告，宣伝，勧誘行為</li>
              <li>面識のない異性との出会いを目的とした行為</li>
              <li>反社会的勢力に対する利益供与</li>
              <li>前各号の行為を直接または間接に促進する行為</li>
            </ol>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第4条（当サービスの提供の停止等）</h2>
            <p>
              当サービスは，以下のいずれかの事由があると判断した場合，ユーザーに事前に通知することなく当サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
            <ol className="list-decimal pl-6 space-y-2 mt-2">
              <li>当サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
              <li>地震，落雷，火災，停電または天災などの不可抗力により，当サービスの提供が困難となった場合</li>
              <li>コンピュータまたは通信回線等が事故により停止した場合</li>
              <li>その他，当サービスの提供が困難と判断した場合</li>
            </ol>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第5条（利用制限および登録抹消）</h2>
            <p>
              当サービスは，ユーザーが本規約のいずれかの条項に違反した場合には，事前の通知なく，ユーザーに対して当サービスの全部または一部の利用を制限し，またはユーザーとしての登録を抹消することができるものとします。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第6条（保証の否認および免責事項）</h2>
            <p>
              当サービスは，当サービスに事実上または法律上の瑕疵（安全性，信頼性，正確性，完全性，有効性，特定の目的への適合性，セキュリティなどに関する欠陥，エラーやバグ，権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第7条（サービス内容の変更等）</h2>
            <p>
              当サービスは，ユーザーに通知することなく，当サービスの内容を変更しまたは当サービスの提供を中止することができるものとし，これによってユーザーに生じた損害について一切の責任を負いません。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第8条（利用規約の変更）</h2>
            <p>
              当サービスは，必要と判断した場合には，ユーザーに通知することなくいつでも本規約を変更することができるものとします。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第9条（通知または連絡）</h2>
            <p>
              ユーザーと当サービスとの間の通知または連絡は，当サービスの定める方法によって行うものとします。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第10条（権利義務の譲渡の禁止）</h2>
            <p>
              ユーザーは，当サービスの書面による事前の承諾なく，利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し，または担保に供することはできません。
            </p>
            
            <h2 className="text-xl font-bold mt-6 mb-3">第11条（準拠法・裁判管轄）</h2>
            <p>
              本規約の解釈にあたっては，日本法を準拠法とします。当サービスに関して紛争が生じた場合には，当サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
            
            <p className="text-right mt-8">以上</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Terms;
