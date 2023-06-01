import { Trans } from '@lingui/macro'
import { Tab, Tabs, Paper, Zoom, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableCellProps, Button } from '@material-ui/core'
import { t } from "@lingui/macro";
import { debounce } from 'src/utils/debounce'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { allInvitedUrl, invitedUrl, THEME_LIGHT } from 'src/constants'
import { useWeb3Context, useAppSelector } from 'src/hooks'
import styled from 'styled-components'
import { isPending } from '../Claim'
import { useDispatch } from 'react-redux'
import { info } from "src/slices/MessagesSlice";
import copy from 'copy-to-clipboard';
import { GridFlex } from 'src/components/Grid';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';

const Main = styled(GridFlex)`
	padding: 20px;
	width: 100%;
	justify-content: center;
	align-items: center;
	@media (max-width: 750px) {
    	padding: 0;
  }
`

const PaperCard = styled(Paper)`
	min-width: 350px;
	@media (max-width: 750px) {
    	padding: 0 !important;
  }
`

const Title = styled.div`
	padding: 20px 20px 0;
	line-height: 1.5;
	font-size: 24px;
	width: 100%;
	text-align: center;
	@media (max-width: 750px) {
    font-size: 18px;
  }
`

const Search = styled.div`
	display: flex;
	width: 100%;
	background-color: transparent;
	flex-direction: row ;
	justify-content: space-between;
	padding: 40px 20px;
`

const SearchInput = styled.input<{ color: string }>`
	flex: 1;
	margin-right: 20px;
	padding: 8px 0px 8px 20px;
	font-size: 16px;
	resize: none;
	appearance: none;
	color: ${({ color }) => color};
	border: ${({ color }) => `1px solid ${color}`}  ;
	border-radius: 8px;
	background: transparent;
	@media (max-width: 750px) {
    font-size: 12px;
		padding-left: 8px;
  }
`

const TabOption = styled(Tab)`
	& .MuiTab-wrapper {
		@media (max-width: 750px) {
  	  font-size: 16px;
  	}
	}
`

const TabsHeader = styled.div`
	width: 100%;
	margin: 20px 0px 20px;
`

const ClaimBtn = styled(Button)({
	marginTop: "8px",
	backgroundColor: "#F8CC82",
	color: "#000",
	borderRadius: "8px",
	cursor: "pointer"
})

const Loading = styled(Skeleton)`
	width: 100%;
	height: 300px;
`

const TableCellOption = styled(TableCell)`
	.MuiTableContainer-root &{
		@media (max-width: 750px) {
  	  font-size: 12px;
  	}
	}
`

interface ColumnsType extends TableCellProps {
	label: string;
	id: "address" | "inviteCode" | "scBalance";
}

interface DataType {
	data: DataListType[],
	totalCount: number,
	pageNo: number,
	pageSize: number,
	idx: number
}


interface DataListType {
	id: "address" | "inviteCode" | "scBalance",
	address: string,
	inviteCode: string,
	scBalance: string,
}

const initalData: DataType = {
	data: [],
	totalCount: 0,
	pageNo: 1,
	pageSize: 10,
	idx: 0
}

function InviteUsers() {
	const { address } = useWeb3Context()
	const dispatch = useDispatch();
	const theme = useAppSelector(state => state.theme.theme)
	const [searchAddress, setSearchAddress] = useState(address)
	const [addr, setAddr] = useState("")
	const [flag, setFlag] = useState(false)
	const [data, setData] = useState<DataType>(initalData)
	const [invitedData, setInvitedData] = useState<{ invited: DataType, allInvited: DataType }>({ invited: initalData, allInvited: { ...initalData, idx: 1 } })
	const [pendingStatus, setPendingStatus] = useState({ search: true });
	const [value, setValue] = useState(0)

	const columns: Array<ColumnsType> = [
		{ id: 'address', label: t`Address` },
		{ id: 'inviteCode', label: t`InviteCode` },
		{
			id: 'scBalance',
			label: t`SC Balance`,
			// numeric: true,
			align: 'right',
		}
	];

	const handleChangePage = (_event: any, pageNo: number) => {
		setData({
			...data,
			pageNo: pageNo + 1
		});
	};

	const handleChangeRowsPerPage = (event: { target: { value: string | number; }; }) => {
		const pageSize = Number(event.target.value) || 10;
		setData({
			...data,
			pageSize
		});
	};

	const getAllInvited = useCallback(
		async () => {
			if (searchAddress) {
				const { pageNo, pageSize, idx } = data
				let url = invitedUrl
				let keyWords: "allInvited" | "invited" = "invited"
				const params = `?addr=${searchAddress}&pageNo=${pageNo}&pageSize=${pageSize}`
				if (value) {
					url = allInvitedUrl;
					keyWords = "allInvited"
				}
				const { idx: currentIdx, pageNo: currentPageNo, pageSize: currentPageSize } = invitedData[keyWords];
				if ((addr === searchAddress) && addr && (idx === currentIdx) && (currentPageNo === pageNo) && (pageSize === currentPageSize)) {
					// dispatch(info(t`${searchAddress} search`));
					setTimeout(() => {
						setPendingStatus({ search: false })
						setFlag(false)
					}, 1000);
					return;
				}

				let result = data
				try {
					const res = await fetch(url + params)

					result = await res.json()
				} catch (error) {

				}

				if (!result?.data?.length && pageNo === 1) {
					dispatch(info(t`${searchAddress} no invited users`))
				}

				setData({
					...data,
					totalCount: result.totalCount ?? 0,
					data: result.data ?? []
				})
				setInvitedData({
					...invitedData,

					[keyWords]: {
						...data,
						totalCount: result.totalCount ?? 0,
						data: result.data ?? []
					}
				})
			}
			setTimeout(() => {
				setPendingStatus({ search: false })
				setAddr(searchAddress)
				setFlag(false)
			}, 1000);

		},
		[searchAddress, invitedData, addr, value, data]
	)

	useEffect(() => {
		if (flag) {
			setPendingStatus({ search: true })
			getAllInvited()
		}
	}, [flag, searchAddress])

	useEffect(() => {
		setFlag(true)
	}, [value, data])

	useEffect(() => {
		setSearchAddress(
			address
			// "0x20f4781f3ce2e73ae5e1f742e2c323f676202527"
		)
		setFlag(true)
	}, [address])

	const search = useCallback(
		() => {
			if (pendingStatus.search) return;
			if (!searchAddress) return dispatch(info(t`Enter a wallet Address`))
			debounce(() => {
				setFlag(true)
			}, 500)
		},
		[flag, pendingStatus]
	)



	return (
		<Main >
			<Zoom in={true} >
				<PaperCard className={"ohm-card"}>
					<Title><Trans>Query invited users</Trans></Title>
					<Search >
						<SearchInput
							id="amount-input"
							placeholder="Enter a wallet Address"
							className="stake-input"
							color={theme === THEME_LIGHT ? "#000" : "#F9FAFC"}
							value={searchAddress}
							onChange={e => {
								setSearchAddress(e.target.value)
							}}
							disabled={pendingStatus.search}
						/>
						<ClaimBtn
							className="stake-button sc-stake-button"
							variant="contained"
							color="primary"
							disabled={pendingStatus.search || !searchAddress}
							key={pendingStatus.search + ""}
							onClick={search}
						>
							{isPending(pendingStatus, "search", t`Search`)}
						</ClaimBtn>
					</Search>

					<TabsHeader>
						<Tabs
							centered
							value={value}
							textColor="primary"
							indicatorColor="primary"
							className="stake-tab-buttons"
							onChange={(_event, newValue) => {
								console.log('newValue', newValue)
								setValue(newValue);
							}}
							aria-label="stake tabs"
						//hides the tab underline sliding animation in while <Zoom> is loading
						>
							<TabOption
								label={t`Invite users`}
							/>
							<TabOption label={t`All subordinate users`} />
						</Tabs>
					</TabsHeader>
					<TableContainer >
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{columns.map((column) => (
										<TableCellOption
											key={column.id}
											align={column?.align}
										>
											{column.label}
										</TableCellOption>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{pendingStatus.search ? <Loading /> : data.data.map((row) => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
											{columns.map((column) => {
												const value = row[column.id] ?? "";
												let newValue = value
												let handleClick = undefined
												let style: CSSProperties | undefined = undefined
												switch (column.id) {
													case "address":
														handleClick = () => {
															copy(value)
														}
														style = { cursor: "pointer" }
														newValue = value.slice(0, 6) + "..." + value.slice(value.length - 6)
														break;

													case "scBalance":
														newValue = (Number(value) || 0).toFixed(4)
														break
													default:
														break;
												}

												return (
													<TableCellOption style={style} onClick={handleClick} key={column.id} align={column?.align}>
														{newValue}
													</TableCellOption>
												);
											})}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 20]}
						component="div"
						count={data.totalCount}
						rowsPerPage={data.pageSize}
						page={data.pageNo - 1}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
						labelRowsPerPage={t`Rows per page:`}
					/>
				</PaperCard>
			</Zoom>
		</Main>
	)
}

export default InviteUsers