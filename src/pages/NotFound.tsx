
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-full gradient-bg mx-auto flex items-center justify-center mb-6">
          <span className="text-4xl font-bold">404</span>
        </div>
        <h1 className="text-3xl font-bold mb-2">ページが見つかりません</h1>
        <p className="text-muted-foreground mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <div className="space-y-4">
          <Button
            className="gradient-bg w-full"
            onClick={() => navigate('/')}
          >
            ホームに戻る
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate(-1)}
          >
            前のページに戻る
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
