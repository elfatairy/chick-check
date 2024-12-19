import { Picker } from '@react-native-picker/picker';
import React, { Dispatch, forwardRef, SetStateAction, useEffect, useImperativeHandle, useState } from 'react'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

export interface CustomInputRef {
    selectedMonth: number | undefined,
    selectedYear: number | undefined,
    setVisible: Dispatch<SetStateAction<boolean>>
}

const MonthYearPicker = forwardRef<CustomInputRef, {getMonthData: (year: number, month: number) => {}}>(({getMonthData}, ref) =>  {
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [visible, setVisible] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
        selectedMonth,
        selectedYear,
        setVisible
    }));

    useEffect(() => {
        const now = new Date();

        const _years = getYears(2024, now.getFullYear());
        setYears(_years);

        let _months = [];
        if (_years[_years.length - 1] == 2024) {
            _months = getMonths(10, now.getMonth() + 1);
        } else {
            _months = getMonths(1, now.getMonth() + 1);
        }
        setMonths(_months);
    }, []);

    useEffect(() => {
        if(years) {
            const now = new Date();
    
            if (selectedYear == 2024) {
                if (now.getFullYear() == 2024) {
                    setMonths(getMonths(10, now.getMonth() + 1));
                } else {
                    setMonths(getMonths(10, 12));
                }
            } else if (selectedYear == now.getFullYear()) {
                setMonths(getMonths(1, now.getMonth() + 1));
            } else {
                setMonths(getMonths(1, 12));
            }
        }
    }, [selectedYear]);

    const getYears = (startYear: number, endYear: number) => {
        let years = []
        for (let i = startYear; i <= endYear; i++) {
            years.push(i)
        }
        return years;
    }

    const getMonths = (startMonth: number, endMonth: number) => {
        let months = []
        for (let i = startMonth; i <= endMonth; i++) {
            months.push(i);
        }
        return months;
    }

    const renderPickerItems = (data: number[]) => {
        let items = data.map((value, index) => {
            return (<Picker.Item key={'r-' + index} label={'' + value} value={value} />)
        })
        return items;
    }
    
    const show = async () => {
        setVisible(true);
    }

    const dismiss = () => {
        setVisible(false);
    }

    const onCancelPress = () => {
        dismiss();
    }

    const onConfirmPress = () => {
        console.log("selectedYear");
        console.log(selectedYear);
        console.log("selectedMonth");
        console.log(selectedMonth);
        if(selectedYear && selectedMonth)
            getMonthData(selectedYear, selectedMonth);
        dismiss();
    }


    if (!visible) return null;

    return (
        <TouchableOpacity
            style={styles.modal}
            onPress={onCancelPress}
        >
            <View
                style={styles.outerContainer}
            >
                <View style={styles.toolBar}>
                    <TouchableOpacity style={styles.toolBarButton} onPress={onCancelPress}>
                        <Text style={styles.toolBarButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1 }} />
                    <TouchableOpacity style={styles.toolBarButton} onPress={onConfirmPress}>
                        <Text style={styles.toolBarButtonText}>Confirm</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.innerContainer}>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedYear}
                        onValueChange={(itemValue) => setSelectedYear(itemValue)}
                    >
                        {renderPickerItems(years)}
                    </Picker>
                    <Picker
                        style={styles.picker}
                        selectedValue={selectedMonth}
                        onValueChange={(itemValue) => setSelectedMonth(itemValue)}
                    >
                        {renderPickerItems(months)}
                    </Picker>
                </View>
            </View>
        </TouchableOpacity>
    )
});

const styles = StyleSheet.create({
    modal: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    outerContainer: {
        backgroundColor: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    toolBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 44,
        borderBottomWidth: 1,
        borderColor: '#EBECED',
    },
    toolBarButton: {
        height: 44,
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    toolBarButtonText: {
        fontSize: 15,
        color: '#2d4664',
    },
    innerContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    picker: {
        flex: 1,
    }
})

export default MonthYearPicker