import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  ActionIcon,
  Box,
  Button,
  DefaultMantineColor,
  Flex,
  Group,
  Menu,
  Paper,
  Pill,
  Rating,
  Skeleton,
  Stack,
  StyleProp,
  Table,
  Text,
} from "@mantine/core";
import classes from "./MediaTable.module.scss";
import { Link, useNavigate } from "@tanstack/react-router";
import { TableHeader } from "./TableHeader";
import { formatDate } from "@repo/schemas/dateFunctions";
import { Media, MediaArray } from "../../types/media";
import { MediaStatus } from "@repo/schemas/mediaSchema";
import { isNullish } from "remeda";
import { IconDotsVertical } from "@tabler/icons-react";

interface MediaTableProps {
  data: NonNullable<MediaArray>;
  viewOnly?: boolean;
  isLoading: boolean;
}

export const MediaTable = ({ data, isLoading, viewOnly }: MediaTableProps) => {
  const navigate = useNavigate();
  const columnHelper = createColumnHelper<Media>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const tableColumns = useMemo(
    () => [
      columnHelper.accessor("title", {
        id: "Title",
        header: (ctx) => <TableHeader ctx={ctx} />,
        cell: (info) => {
          return (
            <Box>
              <Box visibleFrom="sm">{info.getValue()}</Box>
              <Box hiddenFrom="sm">
                <Text fw="bold">{info.getValue()}</Text>
              </Box>
            </Box>
          );
        },
      }),
      columnHelper.accessor("type", {
        id: "Media Type",
        header: (ctx) => <TableHeader ctx={ctx} />,
      }),
      columnHelper.accessor("status", {
        id: "Status",
        header: (ctx) => <TableHeader ctx={ctx} />,
        cell: (info) => {
          const colors: Record<MediaStatus, StyleProp<DefaultMantineColor>> = {
            Completed: "teal",
            "In Progress": "yellow",
            Planned: "grape",
            Dropped: "red",
          };

          return (
            <Pill bg={colors[info.getValue() as MediaStatus]} c="white" fw="bold">
              {info.getValue()}
            </Pill>
          );
        },
      }),
      columnHelper.accessor("createdAt", {
        id: "Added On",
        header: (ctx) => <TableHeader ctx={ctx} />,
        cell: (info) => {
          return (
            <Box>
              <Box visibleFrom="sm">{formatDate(info.getValue() ?? new Date())}</Box>
              <Group hiddenFrom="sm" gap="xs">
                <Text>Added On: </Text>
                <Text>{formatDate(info.getValue() ?? new Date())}</Text>
              </Group>
            </Box>
          );
        },
        enableColumnFilter: false,
        enableGlobalFilter: false,
        sortingFn: "datetime",
      }),
      columnHelper.accessor("rating", {
        id: "Rating",
        header: (ctx) => <TableHeader ctx={ctx} />,
        cell: (info) => <Rating size="xs" value={info.getValue() ?? 0} readOnly />,
        enableGlobalFilter: false,
        enableColumnFilter: false,
      }),
      columnHelper.display({
        id: "Actions",
        header: () => null,
        cell: (info) => {
          const { id } = info.row.original;

          return (
            <Box>
              <Menu>
                <Menu.Target>
                  <ActionIcon
                    variant="transparent"
                    visibleFrom="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <IconDotsVertical stroke={1} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate({
                        to: "/media/$mediaId/view",
                        params: { mediaId: id.toString() },
                      });
                    }}
                  >
                    View
                  </Menu.Item>
                  {!viewOnly && (
                    <Menu.Item
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate({
                          to: "/media/$mediaId/update",
                          params: { mediaId: id.toString() },
                        });
                      }}
                    >
                      Update
                    </Menu.Item>
                  )}
                </Menu.Dropdown>
              </Menu>
              <Group grow hiddenFrom="sm">
                <Link to="/">
                  <Button size="xs" variant="light">
                    View
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="xs" variant="light">
                    Update
                  </Button>
                </Link>
              </Group>
            </Box>
          );
        },
        enableSorting: false,
        enableColumnFilter: false,
      }),
    ],
    [columnHelper, navigate, viewOnly]
  );

  const table = useReactTable({
    columns: tableColumns,
    data,
    state: {
      sorting,
      globalFilter,
    },
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  const getFilterValue = (val: unknown) => {
    return `${val}`;
  };

  return (
    <Stack gap="xs">
      <Flex gap="sm" wrap="wrap" mt="xs">
        {table.getAllColumns().map((col) => {
          if (col.getCanFilter()) {
            if (isNullish(col.getFilterValue())) return null;
            return (
              <Pill
                key={col.id}
                withRemoveButton
                onRemove={() => col.setFilterValue(undefined)}
                bg="teal"
                c="white"
                fw="bold"
              >
                {getFilterValue(col.getFilterValue())}
              </Pill>
            );
          }
        })}
      </Flex>
      {/* <Stack hiddenFrom="sm">
        {table.getRowModel().rows.map((row) => (
          <MediaCard key={row.id} media={row.original} />
        ))}
      </Stack> */}

      <Stack visibleFrom="sm">
        <Paper shadow="xs">
          <Box mt="md" hidden={!isLoading}>
            <Skeleton height={30} width="40%" radius="sm" />
            {[...Array(8)].map((_i, idx) => {
              return <Skeleton height={20} mt={25} radius="sm" key={idx} />;
            })}
            <Skeleton height={30} mt="auto" width="70%" style={{ alignSelf: "flex-end" }} radius="sm" />
          </Box>

          <Table withColumnBorders withRowBorders hidden={isLoading}>
            <Table.Thead className={classes.header}>
              {table.getHeaderGroups().map((headerGroup) => (
                <Table.Tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <Table.Th key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </Table.Th>
                  ))}
                </Table.Tr>
              ))}
            </Table.Thead>
            <Table.Tbody>
              {table.getRowModel().rows.map((row) => (
                <Table.Tr
                  key={row.id}
                  className={classes.row}
                  onClick={() => {
                    if (row.original)
                      navigate({
                        to: "/media/$mediaId/view",
                        params: {
                          mediaId: row.original.id.toString(),
                        },
                      });
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Td key={cell.id} data-heading={cell.column.id !== "Actions" ? cell.column.id : undefined}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Table.Td>
                  ))}
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>
    </Stack>
  );
};
