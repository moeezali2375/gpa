import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  // BlobProviderParams,
} from "@react-pdf/renderer";

// Define the styles for the PDF
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fff",
    padding: 20,
  },
  section: {
    marginBottom: 10,
  },
  table: {
    width: "auto",
    margin: "10px 0",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    textAlign: "center",
  },
  headerCell: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

interface Course {
  _id: string;
  name: string;
  credits: number;
  grade: string;
}

interface Semester {
  number: number;
  season: string;
  year: number;
  courses: Course[];
}

interface GPA {
  sgpa: string;
  cgpa: string;
}

interface TableProps {
  semesters: Semester[];
  gpaArray: GPA[];
}

const Table: React.FC<TableProps> = ({ semesters, gpaArray }) => (
  <View style={styles.table}>
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, styles.headerCell]}>Semester</Text>
      <Text style={[styles.tableCell, styles.headerCell]}>Season</Text>
      <Text style={[styles.tableCell, styles.headerCell]}>Year</Text>
      <Text style={[styles.tableCell, styles.headerCell]}>Course</Text>
      <Text style={[styles.tableCell, styles.headerCell]}>Credits</Text>
      <Text style={[styles.tableCell, styles.headerCell]}>Grade</Text>
      <Text style={[styles.tableCell, styles.headerCell]}>SGPA</Text>
      <Text style={[styles.tableCell, styles.headerCell]}>CGPA</Text>
    </View>
    {semesters.map((semester, idx) => {
      const gpa = gpaArray[idx] || { sgpa: "N/A", cgpa: "N/A" };
      return (
        <React.Fragment key={semester.number}>
          {semester.courses.map((course, i) => (
            <View style={styles.tableRow} key={course._id}>
              {i === 0 && (
                <>
                  <Text style={styles.tableCell}>{semester.number}</Text>
                  <Text style={styles.tableCell}>{semester.season}</Text>
                  <Text style={styles.tableCell}>{semester.year}</Text>
                </>
              )}
              <Text style={styles.tableCell}>{course.name}</Text>
              <Text style={styles.tableCell}>{course.credits}</Text>
              <Text style={styles.tableCell}>{course.grade}</Text>
              {i === 0 && (
                <>
                  <Text style={styles.tableCell}>{gpa.sgpa}</Text>
                  <Text style={styles.tableCell}>{gpa.cgpa}</Text>
                </>
              )}
            </View>
          ))}
        </React.Fragment>
      );
    })}
  </View>
);

interface MyDocumentProps {
  semesters: Semester[];
  gpaArray: GPA[];
}

const MyDocument: React.FC<MyDocumentProps> = ({ semesters, gpaArray }) => (
  <Document>
    <Page style={styles.page}>
      <View style={styles.section}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          Semester Details
        </Text>
        <Table semesters={semesters} gpaArray={gpaArray} />
      </View>
    </Page>
  </Document>
);

interface TableToPDFProps {
  semesters: Semester[];
  gpaArray: GPA[];
}

const TableToPDF: React.FC<TableToPDFProps> = ({ semesters, gpaArray }) => {
  return (
    <div>
      <h2>Generate PDF with Semester Information</h2>
      <PDFDownloadLink
        document={<MyDocument semesters={semesters} gpaArray={gpaArray} />}
        fileName="semester_report.pdf"
      >
        {/* {(params: BlobProviderParams) => */}
        {/*   params.loading ? "Loading document..." : "Download PDF" */}
        {/* } */}
      </PDFDownloadLink>
    </div>
  );
};

export default TableToPDF;
