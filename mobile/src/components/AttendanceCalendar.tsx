import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

const DAY_LABELS = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

type Props = {
  checkinDates: string[];
};

function buildLastSevenDays(): { date: string; label: string; isToday: boolean }[] {
  const days: { date: string; label: string; isToday: boolean }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const date = d.toISOString().slice(0, 10);
    days.push({ date, label: DAY_LABELS[d.getDay()], isToday: i === 0 });
  }
  return days;
}

// Menampilkan 7 hari kalender terakhir & menandai hari yang anak buka
// aplikasi. Perhitungan streak (naik/reset otomatis) menyusul di task
// berikutnya — di sini baru menampilkan data yang sudah tercatat.
export function AttendanceCalendar({ checkinDates }: Props) {
  const days = buildLastSevenDays();

  return (
    <View style={styles.row}>
      {days.map((day) => {
        const isPresent = checkinDates.includes(day.date);
        return (
          <View
            key={day.date}
            style={[
              styles.cell,
              isPresent && styles.cellPresent,
              day.isToday && styles.cellToday,
            ]}
          >
            <Text style={styles.dayLabel}>{day.label}</Text>
            <Text style={styles.mark}>{isPresent ? "🔥" : "·"}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 6 },
  cell: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "transparent",
    paddingVertical: 10,
    alignItems: "center",
  },
  cellPresent: {
    backgroundColor: "rgba(255,210,61,0.14)",
  },
  cellToday: {
    borderColor: colors.star,
  },
  dayLabel: { color: colors.textMuted, fontSize: 9, fontWeight: "700", marginBottom: 4 },
  mark: { fontSize: 16 },
});
