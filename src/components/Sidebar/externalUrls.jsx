import { ReactComponent as ForumIcon } from "../../asstes/icons/forum.svg";
import { ReactComponent as GovIcon } from "../../asstes/icons/governance.svg";
import { ReactComponent as DocsIcon } from "../../asstes/icons/docs.svg";
import { ReactComponent as FeedbackIcon } from "../../asstes/icons/feedback.svg";
import { SvgIcon } from "@material-ui/core";
import { Trans } from "@lingui/macro";

const externalUrls = [
  {
    title: <Trans>Forum</Trans>,
    url: "https://forum.olympusdao.finance/",
    icon: <SvgIcon color="primary" component={ForumIcon} />,
  },
  {
    title: <Trans>Governance</Trans>,
    url: "https://vote.olympusdao.finance/",
    icon: <SvgIcon color="primary" component={GovIcon} />,
  },
  {
    title: <Trans>Docs</Trans>,
    url: "https://docs.olympusdao.finance/",
    icon: <SvgIcon color="primary" component={DocsIcon} />,
  },
  // {
  //   title: "Feedback",
  //   url: "https://olympusdao.canny.io/",
  //   icon: <SvgIcon color="primary" component={FeedbackIcon} />,
  // },
];

export default externalUrls;
