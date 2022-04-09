import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';

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
		border: "1px solid #FFF",
	},
	container: {
		maxHeight: 440,
		textAlign: "center"
	},
	td: {
		padding: "8px",
		fontSize: "12px",
		background: "transparent",
		textAlign: "center",
		margin: "-1px -1px 0 0",
		border: "1px solid #FFF",
		borderTop: "0 none",
	}
});


function LinearCard() {
	const classes = useStyles();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};


	const columns: Column[] = [
		{
			id: 'name', label: "Phase"
		},
		{
			id: 'total', label: "PHS per USDT"
		},
		{
			id: 'price',
			label: "Token Supply",

			align: 'right',
		},
		{
			id: 'addNum',
			label: "PHS per 1000 USDT",

			align: 'right',
		}
	];

	const rows = [
		createData("Pre-Sale 1", "4U", "90,000", 250),
		createData("Pre-Sale 2", "5U", "90,000", 200),
	];


	return (
		<Main>
			<LinearTitle>
				<Left ><span>{"IDO Rules"}</span></Left>
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
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
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