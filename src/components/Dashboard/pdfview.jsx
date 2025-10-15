import React, { useState, useEffect, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Search, 
  Download,
  Printer,
  Bookmark,
  FileText,
  X,
  BookOpen
} from "lucide-react";

export default function PdfView() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [zoom, setZoom] = useState(100);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [currentSearchIndex, setCurrentSearchIndex] = useState(0);
  const [bookmarks, setBookmarks] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const pdfContainerRef = useRef(null);

  // Mock PDF content
  const samplePDFContent = [
    { 
      page: 1, 
      title: "Introduction to React.js",
      content: "React is a JavaScript library for building user interfaces. It lets you create reusable UI components and manage state efficiently.\n\nKey Features:\n• Component-based architecture\n• Virtual DOM for performance\n• One-way data flow\n• Rich ecosystem and community"
    },
    { 
      page: 2, 
      title: "Components and Props",
      content: "Components let you split the UI into independent, reusable pieces. Think of components as JavaScript functions.\n\nProps are inputs to components. They are passed down from parent components and are read-only."
    },
    { 
      page: 3, 
      title: "State and Lifecycle",
      content: "State allows React components to change their output over time in response to user actions, network responses, and anything else.\n\nLifecycle methods let you run code at specific points in a component's lifetime."
    },
    { 
      page: 4, 
      title: "Hooks",
      content: "Hooks let you use state and other React features without writing a class. They are functions that let you 'hook into' React state and lifecycle features.\n\nCommon Hooks:\n• useState\n• useEffect\n• useContext\n• useReducer"
    },
    { 
      page: 5, 
      title: "Tailwind CSS",
      content: "Tailwind CSS is a utility-first CSS framework for rapid UI development. Unlike other frameworks, it doesn't have pre-designed components.\n\nBenefits:\n• Faster development\n• Consistent design\n• Highly customizable\n• No unused CSS"
    },
    { 
      page: 6, 
      title: "PDF Viewer Implementation",
      content: "This PDF viewer demonstrates how to build a document reader with React and Tailwind CSS. It includes features like search, bookmarks, and zoom controls.\n\nThe viewer uses a clean white and blue theme for better readability."
    },
    { 
      page: 7, 
      title: "Advanced Features",
      content: "Advanced features include full-text search, bookmark management, zoom controls, and responsive design.\n\nThese features enhance the user experience and make document reading more efficient."
    },
    { 
      page: 8, 
      title: "Performance Optimization",
      content: "Learn how to optimize your React applications for better performance. Techniques include code splitting, memoization, and efficient re-renders.\n\nPerformance is crucial for large documents and complex applications."
    },
    { 
      page: 9, 
      title: "Best Practices",
      content: "Follow these best practices for better code quality and maintainability:\n\n• Keep components small and focused\n• Use meaningful variable names\n• Implement proper error handling\n• Write comprehensive tests"
    },
    { 
      page: 10, 
      title: "Conclusion",
      content: "Thank you for viewing this PDF demonstration. This viewer showcases modern web development techniques with React and Tailwind CSS.\n\nFeel free to explore all the features and see how they work together."
    }
  ];

  // Search functionality
  const handleSearch = (term) => {
    if (!term.trim()) {
      setSearchResults([]);
      setCurrentSearchIndex(0);
      return;
    }

    const results = [];
    samplePDFContent.forEach((page, pageIndex) => {
      const pageContent = page.content.toLowerCase();
      const pageTitle = page.title.toLowerCase();
      const searchTermLower = term.toLowerCase();
      
      if (pageContent.includes(searchTermLower) || pageTitle.includes(searchTermLower)) {
        results.push({
          page: pageIndex + 1,
          title: page.title,
          content: page.content
        });
      }
    });

    setSearchResults(results);
    setCurrentSearchIndex(0);
    
    if (results.length > 0) {
      setCurrentPage(results[0].page);
    }
  };

  const navigateSearch = (direction) => {
    if (searchResults.length === 0) return;
    
    const newIndex = direction === 'next' 
      ? (currentSearchIndex + 1) % searchResults.length
      : (currentSearchIndex - 1 + searchResults.length) % searchResults.length;
    
    setCurrentSearchIndex(newIndex);
    setCurrentPage(searchResults[newIndex].page);
  };

  const toggleBookmark = () => {
    if (bookmarks.includes(currentPage)) {
      setBookmarks(bookmarks.filter(page => page !== currentPage));
    } else {
      setBookmarks([...bookmarks, currentPage]);
    }
  };

  const zoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const zoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  const goToPage = (page) => {
    const pageNum = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNum);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setShowSearch(false);
  };

  useEffect(() => {
    setTotalPages(samplePDFContent.length);
  }, []);

  const currentPageData = samplePDFContent.find(page => page.page === currentPage);

  return (
    <section className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900">
              PDF Document Viewer
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A clean, modern PDF viewer with powerful features and beautiful design
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-blue-100 overflow-hidden">
          
          {/* Top Toolbar */}
          <div className="bg-white border-b border-blue-200 px-6 py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Document Info */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">document.pdf</h2>
                  <p className="text-sm text-gray-500">{totalPages} pages • 2.4 MB</p>
                </div>
              </div>

              {/* Main Controls */}
              <div className="flex items-center gap-3">
                {/* Search Toggle */}
                <button
                  onClick={() => setShowSearch(!showSearch)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    showSearch 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                  }`}
                >
                  <Search className="w-4 h-4" />
                  Search
                </button>

                {/* Action Buttons */}
                <div className="flex items-center gap-1">
                  <button 
                    onClick={toggleBookmark}
                    className={`p-2 rounded-lg transition-colors ${
                      bookmarks.includes(currentPage)
                        ? 'bg-yellow-100 text-yellow-600 border border-yellow-200'
                        : 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors">
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Search Bar */}
            {showSearch && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search in document..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        handleSearch(e.target.value);
                      }}
                      className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 rounded-lg border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                    />
                    <Search className="w-4 h-4 text-blue-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                    
                    {searchTerm && (
                      <button
                        onClick={clearSearch}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  
                  {searchResults.length > 0 && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-blue-600 font-medium">
                        {searchResults.length} results
                      </span>
                      <button
                        onClick={() => navigateSearch('prev')}
                        className="p-1 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4 text-blue-600" />
                      </button>
                      <span className="text-sm text-blue-600 font-medium min-w-8 text-center">
                        {currentSearchIndex + 1}
                      </span>
                      <button
                        onClick={() => navigateSearch('next')}
                        className="p-1 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 text-blue-600" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Bar */}
          <div className="bg-blue-50 px-6 py-3 border-b border-blue-200">
            <div className="flex items-center justify-between">
              {/* Page Navigation */}
              <div className="flex items-center gap-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="p-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 text-blue-600" />
                </button>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-blue-700 font-medium">Page</span>
                  <input
                    type="number"
                    value={currentPage}
                    onChange={(e) => goToPage(parseInt(e.target.value) || 1)}
                    className="w-16 px-2 py-1 text-center bg-white border border-blue-300 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-200 text-blue-900"
                    min="1"
                    max={totalPages}
                  />
                  <span className="text-sm text-blue-600">of {totalPages}</span>
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  className="p-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5 text-blue-600" />
                </button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                {/* Zoom Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={zoomOut}
                    disabled={zoom <= 50}
                    className="p-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
                  >
                    <ZoomOut className="w-4 h-4 text-blue-600" />
                  </button>
                  
                  <span className="text-sm font-medium text-blue-700 min-w-12 text-center">
                    {zoom}%
                  </span>
                  
                  <button
                    onClick={zoomIn}
                    disabled={zoom >= 200}
                    className="p-2 bg-white border border-blue-200 rounded-lg hover:bg-blue-100 disabled:opacity-50 transition-colors"
                  >
                    <ZoomIn className="w-4 h-4 text-blue-600" />
                  </button>
                </div>

                {/* Bookmarks Toggle */}
                <button
                  onClick={() => setShowBookmarks(!showBookmarks)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    showBookmarks 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-white border border-blue-200 text-blue-700 hover:bg-blue-50'
                  }`}
                >
                  Bookmarks ({bookmarks.length})
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex min-h-[600px]">
            {/* Bookmarks Sidebar */}
            {showBookmarks && (
              <div className="w-64 bg-blue-50 border-r border-blue-200 p-4">
                <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Bookmarks
                </h3>
                {bookmarks.length === 0 ? (
                  <p className="text-blue-600 text-sm">No bookmarks yet</p>
                ) : (
                  <div className="space-y-2">
                    {bookmarks.map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          currentPage === page
                            ? 'bg-blue-500 text-white shadow-sm'
                            : 'bg-white text-blue-700 hover:bg-blue-100 border border-blue-200'
                        }`}
                      >
                        <div className="font-medium">Page {page}</div>
                        <div className="text-sm opacity-80">
                          {samplePDFContent.find(p => p.page === page)?.title}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PDF Viewer */}
            <div className="flex-1 bg-gradient-to-br from-blue-50 to-white">
              <div 
                ref={pdfContainerRef}
                className="p-8 h-full flex items-center justify-center"
              >
                {/* PDF Page */}
                <div 
                  className="bg-white shadow-sm border border-blue-200 mx-auto transition-all duration-200 rounded-lg"
                  style={{ 
                    transform: `scale(${zoom / 100})`,
                    transformOrigin: 'center center'
                  }}
                >
                  <div className="p-8 max-w-4xl">
                    {/* Page Header */}
                    <div className="text-center mb-8 pb-6 border-b border-blue-100">
                      <h3 className="text-2xl font-bold text-blue-900 mb-3">
                        {currentPageData?.title}
                      </h3>
                      <div className="flex justify-center items-center gap-4 text-sm text-blue-600">
                        <span>Page {currentPage} of {totalPages}</span>
                        <span>•</span>
                        <span>Zoom: {zoom}%</span>
                        {bookmarks.includes(currentPage) && (
                          <>
                            <span>•</span>
                            <span className="text-yellow-600 flex items-center gap-1">
                              <Bookmark className="w-3 h-3 fill-current" />
                              Bookmarked
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    {/* Page Content */}
                    <div className="prose max-w-none">
                      <div className="text-gray-700 leading-relaxed whitespace-pre-wrap font-sans">
                        {currentPageData?.content}
                      </div>
                    </div>

                    {/* Page Footer */}
                    <div className="mt-8 pt-6 border-t border-blue-100 text-center text-sm text-blue-500">
                      PDF Document Viewer • Clean White & Blue Theme
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Status Bar */}
          <div className="bg-blue-50 border-t border-blue-200 px-6 py-3">
            <div className="flex justify-between items-center text-sm text-blue-700">
              <div className="flex items-center gap-4">
                <span>Ready to read</span>
                {searchResults.length > 0 && (
                  <span className="flex items-center gap-1">
                    <Search className="w-3 h-3" />
                    {searchResults.length} matches found
                  </span>
                )}
              </div>
              <span>Page {currentPage} of {totalPages}</span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Search className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Smart Search</h4>
            <p className="text-sm text-gray-600">Find text across all pages instantly</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Bookmark className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Bookmarks</h4>
            <p className="text-sm text-gray-600">Save and organize important pages</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <ZoomIn className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Zoom Controls</h4>
            <p className="text-sm text-gray-600">Adjust view from 50% to 200%</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100 text-center hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Export Options</h4>
            <p className="text-sm text-gray-600">Download and print documents</p>
          </div>
        </div>
      </div>
    </section>
  );
}