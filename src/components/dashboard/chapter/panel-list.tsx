import React, { useCallback, memo } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Table, TableBody } from "@mui/material";
import { changePanelPosition, deletePannel } from "@/redux/reducers/manga";
import Panel from './panel';
import { ContentChap } from "@/redux/interfaces/interfaces";
import { useAppDispatch } from "@/hooks/use-hook-redux";

interface PanelListProps {
    isUpdate?: boolean;
    chapterContent: ContentChap[];
    onDragEndProp?: (sourceIndex: number, destinationIndex: number) => void;
    deletePanelProp?: (index: number) => void;
}

const PanelList: React.FC<PanelListProps> = memo(({ chapterContent, isUpdate = true, onDragEndProp, deletePanelProp }) => {
    const dispatch = useAppDispatch();
    const onDragEnd = useCallback((result: any) => {
        if (!result.destination || result.source.index === result.destination.index) return;

        if (isUpdate) {
            dispatch(changePanelPosition({ sourceIndex: result.source.index, destinationIndex: result.destination.index }));
        } else {
            if (onDragEndProp) {
                onDragEndProp(result.source.index, result.destination.index);
            }
        }
    }, [dispatch, isUpdate, onDragEndProp]);

    const deletePanel = useCallback((index: number) => {
        if (isUpdate) {
            dispatch(deletePannel(index));
        } else {
            if (deletePanelProp) {
                deletePanelProp(index);
            }
        }
    }, [dispatch, isUpdate, deletePanelProp]);


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <Table sx={{ background: "#141414", width: "100%" }}>
                        <TableBody {...provided.droppableProps} ref={provided.innerRef}>
                            {chapterContent.map((panel: ContentChap, index: number) => (
                                <Draggable key={`draggable-${index}`} draggableId={`draggable-${index}`} index={index}>
                                    {(provided, snapshot) => (
                                        <Panel
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            url={panel.url}
                                            index={index}
                                            name={panel.name}
                                            onDelete={deletePanel}
                                            style={{
                                                ...provided.draggableProps.style,
                                                ...(snapshot.isDragging && {
                                                    background: "#666",
                                                    border: "none",
                                                }),
                                            }}
                                            styleDragButton={{
                                                ...(snapshot.isDragging ? { position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" } : { position: "relative", right: "auto", top: "auto", transform: "none" })
                                            }}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </TableBody>
                    </Table>
                )}
            </Droppable>
        </DragDropContext>

    );
})

export default PanelList;