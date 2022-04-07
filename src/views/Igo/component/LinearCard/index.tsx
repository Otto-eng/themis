import styled from "styled-components"
import { GridFlex } from "../../../../components/Grid"
import left from "../../../../images/home/标题-bg01@2x.png"
import tableBg from "../../../../images/home/表格@2x.png"
import right from "../../../../images/home/people@2x.png"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core"
import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
// import { useTranslation } from "react-i18next"

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
  background-image: ${`url(${left})`};
	background-size: 100% 100%;
	width: 250px;
	height: 63px;
	justify-content: start;
  align-items: center;
	padding-left: 16px;
	line-height: 20px;
	font-size: 20px;
	color: #FFF;
	font-weight: bold;
	text-shadow: 2px 0px 0px #6E3811;
	span {
		margin-top: -16px;
	}
`

const Right = styled(GridFlex)`
  background-image: ${`url(${right})`};
	background-size: 100% 100%;
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
	total: number;
	price: string;
	addNum: number;
	condition?: string;
}

function createData(name: string, total: number, price: string, addNum: number, condition?: string): Data {
	return { name, total, price, addNum, condition };
}

const useStyles = makeStyles({
	root: {
		width: '100%',
		backgroundImage: `url(${tableBg})`,
		backgroundSize: "100% 100%",
		background: "transparent",
		margin: "-16px 0 0",
		zIndex: -1,
	},
	container: {
		maxHeight: 440,
		textAlign: "center"
	},
	td: {
		padding: "8px",
		fontSize: "12px",
		background: "transparent",
		border: "0 none",
		textAlign: "center"
	},
	leftLastTd: {
		borderLeft: "1px solid #753E1E",
	},
	topLastTd: {
		borderTop: "1px solid #753E1E",
	}
});


function LinearCard() {
	const classes = useStyles();

	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	// const { t } = useTranslation()

	const columns: Column[] = [
		{
			id: 'name', label: ''
		},
		{
			id: 'total', label: "total1" // t("total1")
		},
		{
			id: 'price',
			label: "price", // t('price'),

			align: 'right',
		},
		{
			id: 'addNum',
			label: "address", // t("address"),

			align: 'right'
		}
	];

	const rows = [
		createData(
			// t("phase1")
			"phase1", 3000000, "0.15U", 10000),
		createData(
			// t("phase2")
			"phase2", 5000000, "0.2U", 25000),
		createData(
			// t("phase3")
			"phase3", 6000000, "0.3U", 30000),
		createData(
			// t("phase3")
			"phase3" + "(V1)", 1000000, "0.3U\n(0.15+token)", 30000),
	];


	return (
		<Main>
			<LinearTitle>
				<Left ><span>{
					"linearReleaseRule"
					//t("linearReleaseRule")
				}</span></Left>
				<Right ></Right>
			</LinearTitle>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column, idx) => {
									const str: string = idx === 0 ? classes.td : `${classes.td} ${classes.leftLastTd}`
									return <TableCell
										className={str}
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								})}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => {
								return (
									<TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
										{columns.map((column, tdIdx) => {
											const value = row[column.id];
											const str: string = tdIdx === 0 ? `${classes.td} ${classes.topLastTd}` : `${classes.td} ${classes.leftLastTd} ${classes.topLastTd}`
											return (<TableCell className={str} key={column.id} align={column.align}>
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