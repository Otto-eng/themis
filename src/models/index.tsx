import { useCallback, useEffect } from "react";
import useModel from "flooks";
import produce from "immer";
import CloseIcon from "@material-ui/icons/Close";
import LoopIcon from "@material-ui/icons/Loop";
import DoneOutlinedIcon from "@material-ui/icons/DoneOutlined";
import ErrorOutlineOutlinedIcon from "@material-ui/icons/ErrorOutlineOutlined";
import styled from "styled-components";
import { Dialog, DialogTitle, ButtonProps, Button, DialogContent, DialogActions } from "@material-ui/core";
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";

import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";


export interface DialogActionsStruct {
	disagree?: { text?: string; onClick?: any };
	agree?: { text?: string; onClick?: any };
}


const ICONS_OBJECT = {
	error: CloseIcon,
	success: DoneOutlinedIcon,
	warn: ErrorOutlineOutlinedIcon,
	loading: LoopIcon,
};

const StyledDialogContent = styled(DialogContent)`
  padding-bottom: 30px;
`;

const StyledActions = styled(DialogActions)`
  justify-content: center;
`;

export const ButtonBase = styled(Button) <{ padding?: string; htmlSize?: number }>`
  padding: ${({ padding = "0" }) => `${padding}`};
  font-size: ${({ htmlSize }) => (htmlSize ? `${htmlSize}px` : "inherit")};
`;

const StyledDialog = styled(Dialog) <{ background?: string }>`
  & .MuiPaper-root {
    margin: 0;
    padding: 15px 20px;
    color: #ffffff;
    background: ${({ background }) => `${background || "#263447"}`};
    border-radius: 8px;
  }
  & .MuiDialogContent-root:first-child {
    padding: 0;
  }
`;

const secondaryTheme = createTheme({
	typography: {
		button: {
			textTransform: "none",
		},
	},
	palette: { primary: { main: "#9B58FF" } },
});

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

const Text = styled(Typography)`
  margin-left: 6px;
  font-size: 16px;
  color: #f9fafc;
  font-weight: 400;
  line-height: 20px;
`;

const StyledTitle = styled(DialogTitle)`
  text-align: center;
`;

interface ThemeButtonProps extends ButtonProps {
	text: string;
	fs?: number;
	padding?: string;
}

export const SecondaryButton = (props: ThemeButtonProps) => {
	const { text, ...others } = props;
	return (
		<MuiThemeProvider theme={secondaryTheme}>
			<ButtonBase color="primary" {...others}>
				{text}
			</ButtonBase>
		</MuiThemeProvider>
	);
};

export const GlobalDialogStatus = (now: any) => ({
	open: false,
	update(current: boolean) {
		now({ open: current });
	},
});

// 检查用户网络状态
export const CheckNetWork = (now: any) => ({
	onLine: window.navigator.onLine,
	update(onLine: boolean) {
		now({ onLine });
	},
});

export type AttentionType = "success" | "warn" | "error" | "loading";

let globalAttentionDialogTimer: ReturnType<typeof setTimeout> | null = null;

export const GlobalAttentionDialog = (now: any) => ({
	open: false,
	content: "content",
	type: undefined,
	update(
		payload:
			| boolean
			| {
				open?: boolean;
				title?: string;
				content?: string;
				type?: AttentionType;
				static?: boolean;
			}
	) {
		const { open, content, type } = now();
		if (typeof payload === "boolean") {
			now({ open: payload });
		} else {
			const next = produce({ open, content, type }, (draft) => {
				draft.open = payload.open === undefined ? open : payload.open;
				draft.content = payload.content === undefined ? content : payload.content;
				draft.type = payload.type;
				return draft;
			});
			now(next);
		}
		if (
			typeof payload !== "boolean" &&
			!payload.static &&
			((typeof payload === "boolean" && payload) || (typeof payload !== "boolean" && payload.open))
		) {
			if (globalAttentionDialogTimer) {
				clearTimeout(globalAttentionDialogTimer);
			}
			globalAttentionDialogTimer = setTimeout(() => {
				const { open } = now();
				if (open) {
					now({ open: false });
				}
			}, 2500);
		}
	},
});

export const useDialog = ({
	title,
	body = null,
	actions = null,
	onClose = true,
	fullWidth = true,
	background,
	model = GlobalDialogStatus,
}: {
	title?: string;
	body?: JSX.Element | null;
	actions?: DialogActionsStruct | null;
	onClose?: any;
	fullWidth?: boolean;
	background?: string;
	model?: any;
}) => {
	const { open, update } = useModel(model);

	const toggle = useCallback(() => {
		update(!open);
	}, [open, update]);

	const Dialog = useCallback(() => {
		const onDialogClose = () => {
			if (!onClose) {
				return;
			}
			typeof onClose === "function" && onClose();
			update(false);
		};
		return (
			<DialogBase
				open={open}
				title={title}
				body={body}
				fullWidth={fullWidth}
				actions={actions}
				background={background}
				onClose={onDialogClose}
			/>
		);
	}, [open, title, body, onClose, fullWidth, actions, update, background]);

	return {
		open,
		toggle,
		Dialog,
	};
}

export const useAttentionDialog = (defaultText?: string) => {
	const { open, content, type, update } = useModel(GlobalAttentionDialog);

	function toggle(currentText?: string) {
		update({ open: !open, content: currentText });
	}

	useEffect(() => {
		if (defaultText) {
			update({ content: defaultText });
		}
	}, [defaultText, update]);

	const Icon = ICONS_OBJECT[type as AttentionType];

	const { Dialog } = useDialog({
		body: (
			<StyledBox>
				{type && <Icon />}
				<Text align="center">{content || "attention text"}</Text>
			</StyledBox>
		),
		model: GlobalAttentionDialog,
		onClose: false,
		fullWidth: false,
	});

	return { toggle, Dialog };
}

export const DialogBase = ({
	open = false,
	actions = null,
	title,
	body = null,
	onClose,
	fullWidth = true,
	background,
}: {
	open?: boolean;
	actions?: DialogActionsStruct | null;
	title?: string;
	body?: JSX.Element | null;
	onClose?: any;
	fullWidth?: boolean;
	background?: string;
}) => {
	return (
		<StyledDialog
			fullWidth={fullWidth}
			open={open}
			onClose={onClose}
			maxWidth={false}
			background={background}
		>
			{title && <StyledTitle>{title}</StyledTitle>}
			<StyledDialogContent>{body}</StyledDialogContent>
			{actions && (
				<StyledActions>
					{actions.disagree && (
						<SecondaryButton
							variant="outlined"
							onClick={actions.disagree?.onClick}
							text={(actions && actions.disagree?.text) || "Disagree"}
						/>
					)}
					{actions.agree && (
						<SecondaryButton
							size="large"
							variant="contained"
							onClick={actions.agree?.onClick}
							text={(actions && actions?.agree?.text) || "Agree"}
						/>
					)}
				</StyledActions>
			)}
		</StyledDialog>
	);
};