/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import * as XLSX from 'xlsx';
import { api } from "~/utils/api";
import {
    MaterialReactTable,
    type MaterialReactTableProps,
    type MRT_Cell,
    type MRT_ColumnDef,
    type MRT_Row,
} from 'material-react-table';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    IconButton,
    MenuItem,
    Stack,
    TextField,
    Tooltip,
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import { Prisma } from '@prisma/client';

type Guest = {
    fullname: string, group: string, id?: number | null | undefined
}
interface TableProps {
    allGuests: Guest[];
}

const GuestTable: React.FC<TableProps> = ({ allGuests }) => {
    const [tableData, setTableData] = useState<Guest[]>(allGuests);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState<{
        [cellId: string]: string;
    }>({});


    const ctx = api.useContext();

    const { mutate: addGuest, isLoading: isAdding } = api.wedding.postGuests.useMutation({
        onSuccess: (data: Prisma.BatchPayload, variables: {
            guests: {
                group: string;
                fullname: string;
                id?: number | null | undefined
            }[];
        }, context: unknown) => {

            void ctx.wedding.getAllGuests.invalidate();
            tableData.push(...variables.guests);
            setTableData([...tableData]);
            console.log("variables.guests");
            console.log(variables.guests);
        },
        onError: (e) => {
            const errorMessage = e.data?.zodError?.fieldErrors.content;
            if (errorMessage && errorMessage[0]) {
                //toast.error(errorMessage[0]);
            } else {
                //toast.error("Failed to post! Please try again later.");
            }
        },
    });

    const handleUpload = (file: File) => {
        if (!file) {
            alert('Please select a file to upload.');
            return;
        }

        const reader = new FileReader();

        reader.onload = function(event) {
            const data = event.target?.result as string;
            const workbook = XLSX.read(data, { type: 'binary' });
            const firstSheetName = workbook.SheetNames[0];
            const workSheet = workbook.Sheets[firstSheetName ?? ""];
            if (!workSheet) {
                return;
            }
            const guests = XLSX.utils.sheet_to_json<Guest>(workSheet, { header: 2 });

            addGuest({ guests });
        };

        reader.readAsBinaryString(file);
    };

    const handleCreateNewRow = (values: Guest) => {
        tableData.push(values);
        setTableData([...tableData]);
    };
    const handleSaveRowEdits: MaterialReactTableProps<Guest>['onEditingRowSave'] =
         ({ exitEditingMode, row, values }) => {
            if (!Object.keys(validationErrors).length) {
                tableData[row.index] = values;
                //send/receive api updates here, then refetch or update local table data for re-render
                setTableData([...tableData]);
                exitEditingMode(); //required to exit editing mode and close modal
            }
        };

    const handleDeleteRow = useCallback(
        (row: MRT_Row<Guest>) => {
            if (
                // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                !confirm(`Are you sure you want to delete ${row.getValue('firstName')}`)
            ) {
                return;
            }
            //send api delete request here, then refetch or update local table data for re-render
            tableData.splice(row.index, 1);
            setTableData([...tableData]);
        },
        [tableData],
    );

    const handleCancelRowEdits = () => {
        setValidationErrors({});
    };
    const columns = useMemo<MRT_ColumnDef<Guest>[]>(() => [
        {
            header: 'Guest Name',
            accessorKey: 'fullname', //using accessorKey dot notation to access nested data
        },
        {
            header: 'Group',
            accessorKey: 'group',
        },
    ],
        [],
    );
    return (
        <>
            <div className="container">
                <MaterialReactTable
                    columns={columns}
                    data={tableData}
                    enableColumnOrdering
                    editingMode="modal"
                    enableGrouping
                    enableEditing
                    onEditingRowSave={handleSaveRowEdits}
                    onEditingRowCancel={handleCancelRowEdits}
                    enableGlobalFilter={false}
                    renderRowActions={({ row, table }) => (
                        <Box sx={{ display: 'flex', gap: '1rem' }}>
                            <Tooltip arrow placement="left" title="Edit">
                                <IconButton onClick={() => table.setEditingRow(row)}>
                                    <Edit />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow placement="right" title="Delete">
                                <IconButton color="error" onClick={() => handleDeleteRow(row)}>
                                    <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )}
                    renderTopToolbarCustomActions={() => (
                        <>
                            <Button
                                color="secondary"
                                onClick={() => setCreateModalOpen(true)}
                                variant="contained"
                            >
                                Add Guest
                            </Button>
                            <Button
                                color="primary"
                                onClick={() => setUploadModalOpen(true)}
                                variant="contained"
                            >
                                Upload Guests From Excel
                            </Button>
                        </>
                    )}
                />
                <UploadNewGuestsModal
                    open={uploadModalOpen}
                    onClose={() => setUploadModalOpen(false)}
                    onSubmit={handleUpload}
                />
                <CreateNewGuestModal
                    columns={columns}
                    open={createModalOpen}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={handleCreateNewRow}
                />
            </div>
        </>
    );
}

export default GuestTable;

interface UploadProps {
    onClose: () => void;
    open: boolean;
    onSubmit: (values: File) => void;
}

export const UploadNewGuestsModal: React.FC<UploadProps> = ({ open, onClose, onSubmit }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = () => {
        //put your validation logic here
        if (!file) {
            return;
        }
        onSubmit(file);
        onClose();
    };


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const selectedFile = e.target.files?.[0];
        setFile(selectedFile || null);
    };


    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Upload Guests From Excel</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <input type="file" accept=".xls, .xlsx, .csv" onChange={handleFileChange} />
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Close</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Guests
                </Button>
            </DialogActions>
        </Dialog>
    );
}

interface ModelProps {
    columns: MRT_ColumnDef<Guest>[];
    onClose: () => void;
    onSubmit: (values: { fullname: string, group: string }) => void;
    open: boolean;
}

export const CreateNewGuestModal: React.FC<ModelProps> = ({ open, columns, onClose, onSubmit }) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const [values, setValues] = useState<any>(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {} as any),
    );
    const handleSubmit = () => {
        //put your validation logic here
        onSubmit(values);
        onClose();
    };

    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Add Guest</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack
                        sx={{
                            width: '100%',
                            minWidth: { xs: '300px', sm: '360px', md: '400px' },
                            gap: '1.5rem',
                        }}
                    >
                        {columns.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) =>
                                    setValues({ ...values, [e.target.name]: e.target.value })
                                }
                            />
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">
                    Create New Guest
                </Button>
            </DialogActions>
        </Dialog>
    );
};

