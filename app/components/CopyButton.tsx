import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
interface CopyButtonProps {
    handleCopy: () => {},
    copied: boolean
}
function CopyButton({ copied, handleCopy }: CopyButtonProps) {
    return (
        <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="absolute top-4 right-4 bg-white"
        >
            {copied ? (
                <>
                    <Check className="h-4 w-4 mr-1" />
                </>
            ) : (
                <>
                    <Copy className="h-4 w-4 mr-1" />
                    <span>Copy</span>
                </>
            )}
        </Button>
    )
}

export default CopyButton