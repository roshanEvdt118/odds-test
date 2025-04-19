// /* eslint-disable react/prop-types */
// import { useState } from "react";
// import {
//   Menu,
//   MenuItem,
//   Box,
//   Chip,
//   TextField,
// } from "@mui/material";
// import Iconify from "@components/iconify";

// export default function VirtualizedDropdown({ onChange, value = null, options = [], placeholder="Select..."}) {
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [filterText, setFilterText] = useState("");

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//     setFilterText(""); // Reset filter on close
//   };

//   const handleSelect = (option) => {
//     onChange(option);
//     handleClose(); // Close dropdown after selecting
//   };

//   const handleDelete = () => {
//     onChange(null);
//   };

//   const filteredOptions = options.filter((option) =>
//     option.label.toLowerCase().includes(filterText.toLowerCase())
//   );

//   return (
//     <div style={{ width: '420px' }}>
//       <Box
//         sx={{
//           width: "100%",
//           height: "55px",
//           mt: "1px",
//           border: anchorEl ? `1px solid #151147` : `1px solid #ccc`,
//           borderRadius: "7px",
//           display: "flex",
//           justifyContent: "space-between",
//           cursor: "pointer",
//         }}
//         onClick={handleClick}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             gap: "4px",
//             alignItems: "center",
//             height: "55.5px",
//             px: 2,
//             overflow: "hidden",
//             whiteSpace: "nowrap",
//           }}
//         >
//           {value ? (
//             value.label
//           ) : (
//             <Box sx={{ color: "#999" }}>{placeholder}</Box>
//           )}
//         </Box>
//         <Box
//           sx={{
//             width: "35.5px",
//             height: "55.5px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             transform: anchorEl ? "rotate(180deg)" : "rotate(0deg)"
//           }}
//         >
//          <Iconify icon="iconamoon:arrow-down-2-light" />
//         </Box>
//       </Box>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         disableAutoFocusItem
//       >
//         <Box p={1}>
//           <TextField
//             size="small"
//             fullWidth
//             placeholder="Search..."
//             variant="outlined"
//             value={filterText}
//             onChange={(e) => setFilterText(e.target.value)}
//             onClick={(e) => e.stopPropagation()}
//           />
//         </Box>

//         <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
//           {filteredOptions.length === 0 ? (
//             <MenuItem disabled>No options found</MenuItem>
//           ) : (
//             filteredOptions.map((option) => (
//               <MenuItem
//                 key={option.value}
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   handleSelect(option);
//                 }}
//                 selected={value?.value === option.value}
//                 sx={{
//                   backgroundColor: value?.value === option.value ? "#f0f0f0" : "transparent",
//                   "&.Mui-selected": {
//                     backgroundColor: "#e0e0f8 !important",
//                   },
//                 }}
//               >
//                 {option.label}
//               </MenuItem>
//             ))
//           )}
//         </Box>
//       </Menu>
//     </div>
//   );
// }

import { useState } from "react";
import { Menu, MenuItem, Box, TextField } from "@mui/material";
import Iconify from "@components/iconify";


// eslint-disable-next-line react/prop-types
export default function SingleSelectDropdown({ onChange, value = null, options = [], placeholder = "Select option", error }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterText, setFilterText] = useState("");

  const isOpen = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setFilterText("");
  };

  const handleSelect = (option) => {
    onChange(option);
    handleClose();
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(filterText.toLowerCase())
  );

  console.log('error',error)

  return (
    <Box sx={{ position: "relative", width: "100%", mt: 3 }}>
      {/* Floating Label */}
      <Box
        component="label"
        sx={{
          position: "absolute",
          top: (isOpen || value) ? -10 : "50%",
          left: 12,
          fontSize: (isOpen || value) ? "12px" : "16px",
          color: value ? "#151147" : "red",
          background: "#fff",
          px: "4px",
          transform: (isOpen || value) ? "translateY(0%)" : "translateY(-50%)",
          transition: "all 0.2s ease-in-out",
          zIndex: 1,
          pointerEvents: "none",
          
        }}
      >
        {placeholder}
      </Box>

      {/* Select Box */}
      <Box
        sx={{
          width: "100%",
          height: "55px",
          // border: isOpen ? `2px solid #151147` : `1px solid #ccc`,
          border: isOpen ? `1px solid ${error ? "red" : "#151147"}` : `1px solid ${error ? "red" : "#151147"}`,
          borderRadius: "7px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          cursor: "pointer",
          position: "relative",
          transition: "border 0.2s ease",
          backgroundColor: "#fff",
        }}
        onClick={handleClick}
      >
        <Box sx={{
    color: value ? "#000" : "#999",
    fontSize: "16px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    maxWidth: "100%", // or set a specific width like "200px"
  }}>
          {value ? value.label : ""}
        </Box>
        <Box
          sx={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <Iconify icon="iconamoon:arrow-down-2-light" width={24} height={24} />
        </Box>
      </Box>

      {/* Dropdown Menu */}
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        <Box p={1}>
          <TextField
            size="small"
            fullWidth
            placeholder="Search..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            onClick={(e) => e.stopPropagation()}
          />
        </Box>
        <Box sx={{ maxHeight: 200, overflowY: "auto" }}>
          {filteredOptions.length === 0 ? (
            <MenuItem disabled>No options found</MenuItem>
          ) : (
            filteredOptions.map((option) => (
              <MenuItem
                key={option.value}
                onClick={() => handleSelect(option)}
                selected={value?.value === option.value}
                sx={{
                  backgroundColor: value?.value === option.value ? "#e0e0f8 !important" : undefined,
                }}
              >
                {option.label}
              </MenuItem>
            ))
          )}
        </Box>
      </Menu>
    </Box>
  );
}
