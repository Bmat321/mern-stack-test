class Linkedin {
    constructor(profileURL, contactInfo) {
      this.profileURL = profileURL;
      this.contactInfo = contactInfo;
    }
  }
  
  function scrollLike(num) {
    window.scrollBy(0, 300);
  
    var links = document.getElementsByTagName("a");
  
    for (var kk = 0; kk < links.length; kk++) {
      if (
        links[kk] &&
        links[kk].getAttribute("data-control-name") &&
        links[kk].getAttribute("data-control-name") == "search_srp_result" &&
        !completed.includes(links[kk].getAttribute("href"))
      ) {
        completed.push(links[kk].getAttribute("href"));
        links[kk].click();
  
        if (num > 0) {
          setTimeout(function () {
            var links = document.getElementsByTagName("a");
  
            for (var kk = 0; kk < links.length; kk++) {
              if (
                links[kk] &&
                links[kk].getAttribute("data-control-name") &&
                links[kk].getAttribute("data-control-name") ==
                  "contact_see_more"
              ) {
                links[kk].click();
  
                setTimeout(function () {
                  var links = document.getElementsByTagName("div");
  
                  for (var kk = 0; kk < links.length; kk++) {
                    if (
                      links[kk] &&
                      links[kk].getAttribute("class") &&
                      links[kk].getAttribute("class").includes("section-info")
                    ) {
                      var searchResult = new SearchResult(
                        links[kk].outerHTML,
                        /* Add contact info here */
                      );
                      // Update view or perform further actions
                      window.history.back(2);
                      window.history.back(2);
                      if (num > 0) {
                        setTimeout(function () {
                          scrollLike(num - 1);
                        }, 7000);
                      }
                    }
                  }
                }, 7000);
              }
            }
          }, 7000);
          break;
        }
      }
    }
  }
  
  alert("Navigate to any search on Linkedin before running this script.");
  
  scrollLike(50);
  