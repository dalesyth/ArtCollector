import React, { Fragment, useState } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
  const { searchTerm, searchValue, setIsLoading, setSearchResults } = props;
  console.log(props);
  return (
    <span className="content">
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          try {
            const response = await fetchQueryResultsFromTermAndValue({
              searchTerm,
              searchValue,
            });
            setSearchResults(response);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        {searchTerm}
      </a>
    </span>
  );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = (props) => {
  const { featuredResult, setIsLoading, setSearchResults } = props;

  console.log(featuredResult.culture);

  return (
    <>
      {!featuredResult ? (
        <main id="feature"></main>
      ) : (
        <main id="feature">
          <div className="object-feature">
            <header>
              <h3>{featuredResult.title}</h3>
              <h4>{featuredResult.dated}</h4>
            </header>

            <section className="facts">
              {featuredResult.description ? (
                <>
                  <span className="title">DESCRIPTION</span>
                  <span className="content">{featuredResult.description}</span>
                </>
              ) : null}

              {featuredResult.culture ? (
                <>
                  <span className="title">CULTURE</span>
                  {/* <span className="content">{featuredResult.culture}</span> */}
                  <span className="content">
                    <Searchable
                      searchTerm={featuredResult.culture}
                      setIsLoading={setIsLoading}
                      searchValue={featuredResult.culture}
                      setSearchResults={setSearchResults}
                    />
                  </span>
                </>
              ) : null}

              {featuredResult.style ? (
                <>
                  <span className="title">STYLE</span>
                  <span className="content">{featuredResult.style}</span>
                </>
              ) : null}

              {featuredResult.technique ? (
                <>
                  <span className="title">TECHNIQUE</span>
                  <span className="content">{featuredResult.technique}</span>
                </>
              ) : null}

              {featuredResult.medium ? (
                <>
                  <span className="title">MEDIUM</span>
                  <span className="content">{featuredResult.medium}</span>
                </>
              ) : null}

              {featuredResult.dimensions ? (
                <>
                  <span className="title">DIMENSIONS</span>
                  <span className="content">{featuredResult.dimensions}</span>
                </>
              ) : null}

              {featuredResult.people ? (
                <>
                  <span className="title">PERSON</span>
                  {featuredResult?.people.map(({ displayname, personid }) => {
                    return (
                      <span key={personid} className="content">
                        {displayname}
                      </span>
                    );
                  })}
                </>
              ) : null}

              {featuredResult.department ? (
                <>
                  <span className="title">DEPARTMENT</span>
                  <span className="content">{featuredResult.department}</span>
                </>
              ) : null}

              {featuredResult.division ? (
                <>
                  <span className="title">DIVISION</span>
                  <span className="content">{featuredResult.division}</span>
                </>
              ) : null}

              {featuredResult.contact ? (
                <>
                  <span className="title">CONTACT</span>
                  <span className="content">{featuredResult.contact}</span>
                </>
              ) : null}

              {featuredResult.creditline ? (
                <>
                  <span className="title">CREDIT</span>
                  <span className="content">{featuredResult.creditline}</span>
                </>
              ) : null}
            </section>

            <section className="photos">
              <img
                src={featuredResult.primaryimageurl}
                alt={featuredResult.description}
              />
            </section>
          </div>
        </main>
      )}
    </>
  );
};

export default Feature;
