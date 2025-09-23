import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { IQuestion, QuestionsState } from "../../types/store/questions"
import { API_URL } from "../../const/urls"

const initialState: QuestionsState = {
    questions: [],
    isLoading: false,
    error: null
}

export const fetchQuestions = createAsyncThunk<
    IQuestion[],
    void,
    { rejectValue: { status: string; message: string } }
>(
    "questions/fetchQuestions",
    async (_, thunkAPI) => {
        try {
            const res = await fetch(API_URL, {
                method: "GET"
            })

            if (!res.ok) {
                const data = await res.json().catch(() => null);
                return thunkAPI.rejectWithValue({
                    status: res.status.toString(),
                    message: data?.message || res.statusText || "Failed to fetch user",
                });
            }

            const data: {results: IQuestion[], responseCode: string} = await res.json();
            return data.results;
        } catch (err) {
            return thunkAPI.rejectWithValue({
                status: "400",
                message: err instanceof Error ? err.message : String(err),
            });
        }
    }
)

const questionsSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {},
    extraReducers: builder =>{
        builder
            .addCase(fetchQuestions.pending, state => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchQuestions.fulfilled, (state, action: PayloadAction<IQuestion[]>) => {
                state.questions = action.payload;
                state.isLoading = false;
            })
            .addCase(fetchQuestions.rejected, (state, action) => {
                state.error = action.payload ?? { status: "400", message: "Failed to fetch questions" };
                state.isLoading = false;
            });
    }
})

export default questionsSlice.reducer;