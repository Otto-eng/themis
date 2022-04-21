import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Trans, t } from "@lingui/macro";

const Main = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;
	z-index: 0;
`

const LinearTitle = styled(GridFlex)`
	justify-content: start;
  align-items: center;
	width: 100%;
	height: 90px;
`

const Left = styled(GridFlex)`
	width: 100%;
	height: 63px;
	justify-content: center;
  align-items: center;
	font-size: 24px;
	font-family: Roboto;
	font-weight: bold;
	line-height: 20px;
	opacity: 1;
`

const Right = styled(GridFlex)`
	width: 74px;
	height: 90px;
	margin-left: -20px;
	justify-content: start;
  align-items: center;
`

interface Column {
	id: 'name' | 'total' | 'price' | 'addNum' | "condition";
	label: string;
	minWidth?: number;
	align?: 'right';
	format?: (value: number) => string;
}

interface Data {
	name: string;
	total: string;
	price: string;
	addNum: number;
	condition?: string;
}

function createData(name: string, total: string, price: string, addNum: number, condition?: string): Data {
	return { name, total, price, addNum, condition };
}

const useStyles = makeStyles({
	root: {
		width: '100%',
		background: "transparent",
		margin: "-16px 0 0",
		zIndex: -1,
	},
	th: {
		padding: "8px",
		fontSize: "12px",
		textAlign: "center",
		border: "1px solid #E6DEED",
	},
	container: {
		maxHeight: 440,
		textAlign: "center",
	},
	td: {
		padding: "8px",
		fontSize: "12px",
		background: "transparent",
		textAlign: "center",
		margin: "-1px -1px 0 0",
		border: "1px solid #E6DEED",
		borderTop: "0 none",
	}
});


function LinearCard() {
	const classes = useStyles();

	const columns: Column[] = [
		{
			id: 'name', label: t`Phase`
		},
		{
			id: 'total', label: t`THS per USDT`
		},
		{
			id: 'price',
			label: t`Token Supply`,

			align: 'right',
		},
		{
			id: 'addNum',
			label: t`THS per 1000 USDT`,

			align: 'right',
		}
	];

	const rows = [
		createData(t`Pre-Sale`, "4U", "125,000", 250),
	];


	return (
		<Main>
			<LinearTitle>
				<Left ><span><Trans>IDO Rules</Trans></span></Left>
			</LinearTitle>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column, idx) => {
									return <TableCell
										className={classes.th}
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth, borderLeft: !!idx ? "0 none" : "" }}
									>
										{column.label}
									</TableCell>
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
										{columns.map((column, tdIdx) => {
											const value = row[column.id];
											return (<TableCell style={{ borderLeft: !!tdIdx ? "0 none" : "" }} className={classes.td} key={column.id} align={column.align}>
												{value}
											</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>

		</Main>
	)
}
export default LinearCard