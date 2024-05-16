import { bindActionCreators, createSlice, CreateSliceOptions, SliceCaseReducers, SliceSelectors } from "@reduxjs/toolkit";
import { useAppDispatch } from "../hooks/useAppDispatch/useAppDispatch";
import { useMemo } from "react";

export function buildSlice<
    State,
    CaseReducers extends SliceCaseReducers<State>,
    Name extends string,
    Selectors extends SliceSelectors<State>,
    ReducerPath extends string = Name>(options: CreateSliceOptions<State, CaseReducers, Name, ReducerPath, Selectors>) {
    const slice = createSlice(options)

    const useActions = () => {
        const dispatch = useAppDispatch()

        return useMemo(() => bindActionCreators(slice.actions, dispatch), [dispatch])
    }

    return {
        ...slice,
        useActions
    }
}