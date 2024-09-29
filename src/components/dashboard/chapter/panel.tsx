import React, { forwardRef, memo } from "react";
import { TableCell, TableRow, Box, Button, Typography } from "@mui/material";
import { Trash } from "@phosphor-icons/react/dist/ssr/Trash";

interface PanelProps {
    url: string;
    index: number;
    name: string;
    style?: React.CSSProperties;
    styleDragButton?: React.CSSProperties;
    onDelete: (index: number) => void
}

const Panel = memo(forwardRef<HTMLTableRowElement, PanelProps>(
    ({ url, name, index, style, styleDragButton, onDelete, ...rest }, ref) => {
        return (
            <TableRow key={index} hover ref={ref} {...rest} style={style} sx={{ borderBottom: "1px solid #dcdfe4" }}>
                <TableCell sx={{ width: "100px", border: "none" }}>
                    <Box sx={{ lineHeight: "100px", height: "100px" }} >
                        {url ? (
                            <img
                                src={url}
                                alt={name || `Panel ${index + 1}`}
                                style={{
                                    width: "100px",
                                    height: "100px",
                                    objectFit: "cover",
                                }}
                            />
                        ) : (
                            <Typography component="span" sx={{ color: "#635bff" }}>
                                No Image
                            </Typography>
                        )}
                    </Box>
                </TableCell>
                <TableCell sx={{ border: "none" }}>
                    <Typography component="span" sx={{ color: "#fff" }}>
                        {name}
                    </Typography>
                </TableCell>
                <TableCell sx={{ width: "100px", border: "none", ...styleDragButton }}>
                    <Box display="flex" gap={1}>
                        <Button
                            variant="outlined"
                            onClick={() => onDelete(index)}
                            sx={{
                                minWidth: "40px",
                                padding: 0,
                                height: "30px",
                                borderRadius: "5px",
                                color: "#fff",
                                borderColor: "#fff",
                            }}
                        >
                            <Trash size={16} />
                        </Button>
                    </Box>
                </TableCell>
            </TableRow>
        );
    }
));

export default Panel;