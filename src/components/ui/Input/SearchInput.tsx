import SearchIconButton from '#/components/ui/Button/icon/SearchIconButton'
import {
  Autocomplete,
  AutocompleteChangeReason,
  Stack,
  StackProps,
  TextField,
} from '@mui/material'
import {
  ChangeEventHandler,
  KeyboardEventHandler,
  SyntheticEvent,
  useCallback,
  useState,
} from 'react'

/**
 * 조회 (인풋 + 버튼)공통 부품
 */
export type SearchBarInputProps = {
  onChange?: (keyword: string) => void
  onSearch?: (keyword: string) => void
  history?: Array<string>
  label?: string
} & StackProps

function SearchBarInput({
  onChange,
  onSearch,
  history,
  label,
  ...props
}: SearchBarInputProps) {
  const [keyword, setKeyword] = useState('')

  const handleOnClick = useCallback(() => {
    if (onSearch) {
      onSearch(keyword)
    }
  }, [keyword, onSearch])

  const handleOnChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (e) => {
      const keyword = e.target.value
      setKeyword(keyword)
      if (onChange) {
        onChange(keyword)
      }
    },
    [onChange]
  )
  const handleOnSelect = useCallback(
    (
      _e: SyntheticEvent,
      value: string | null,
      reason: AutocompleteChangeReason
    ) => {
      if (reason === 'selectOption' || reason === 'clear') {
        const keyword = value ?? ''
        setKeyword(keyword)
        if (onChange) onChange(keyword)
      }
    },
    [onChange]
  )

  const handleOnKeydown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (onSearch && e.key === 'Enter') {
        onSearch(keyword)
      }
    },
    [keyword, onSearch]
  )

  return (
    <Stack direction="row" {...props}>
      <Autocomplete
        freeSolo
        options={history ?? []}
        onChange={handleOnSelect}
        onKeyDown={handleOnKeydown}
        noOptionsText=""
        autoSelect={false}
        value={keyword}
        sx={{ flex: 1 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            onChange={handleOnChange}
            onKeyDown={handleOnKeydown}
            value={keyword}
          />
        )}
      />
      <SearchIconButton onClick={handleOnClick} />
    </Stack>
  )
}

export default SearchBarInput
