import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  XIcon,
  XShareButton,
} from "react-share";

const ShareButton = ({ property }) => {
  const shareUrl = `${process.env.NEXT_PUBLIC_DOMAIN}/properties/${property._id}`;
  return (
    <div className="flex items-center justify-center gap-2">
      <TelegramShareButton
        title={`${property.name}`}
        url={shareUrl}
        aria-label="Share on Telegram"
      >
        <TelegramIcon size={32} round />
      </TelegramShareButton>
      <FacebookShareButton
        hashtag={`#${property.type}`}
        url={shareUrl}
        aria-label="Share on Facebook"
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <XShareButton
        title="Read this next"
        via="reactshare"
        hashtags={[`#${property.type}`]}
        url={shareUrl}
        aria-label="Share on X"
      >
        <XIcon size={32} round />
      </XShareButton>

      <EmailShareButton
        subject={`checkout This ${property.type}`}
        body={`you can buy this ${property.name} with lower price in here `}
        url={shareUrl}
        aria-label="Share by email"
      >
        <EmailIcon size={32} round />
      </EmailShareButton>
    </div>
  );
};

export default ShareButton;
