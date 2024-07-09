
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import type { RouterOutputs } from "~/utils/api";
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

type RsvpData = {
    fullname: string;
    mealselection: string;
    songpreference: string;
    notes: string;
    response: string;
    id: number;
}

interface TableProps {
    allRsvps: RsvpData[];
}
const RsvpTable: React.FC<TableProps> = ({ allRsvps }) => {


    const [tableData, setTableData] = useState<RsvpData[]>(allRsvps);
    const columns = useMemo<MRT_ColumnDef<RsvpData>[]>(() => [
        {
            header: 'Guest Name',
            accessorKey: 'fullname', //using accessorKey dot notation to access nested data
        },
        {
            header: 'Meal Selection',
            accessorKey: 'mealselection',
        },
        {
            header: 'Song Preference',
            accessorKey: 'songpreference',
        },
        {
            header: 'Notes',
            accessorKey: 'notes',
        },
        {
            header: 'Response',
            accessorKey: 'response',
        },
    ],
        [],
    );
    return (
        <>
            <MaterialReactTable
                columns={columns}
                data={tableData}
                enableColumnOrdering
                editingMode="modal"
                enableGrouping
                enableGlobalFilter={false}
            />
        </>
    );
}

export default RsvpTable;


