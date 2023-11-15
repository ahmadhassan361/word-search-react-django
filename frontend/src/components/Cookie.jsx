import React from 'react'

export const Cookie = () => {
    const content = `













    Cookie Policy


    CHAMONIX PUBLISHING
    
    Our website (https://wordsearchcafe.com/) uses cookies to distinguish you from other users of our website. This helps us to provide you with a good experience when you browse our website and allows us to improve our site.
    A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer's hard drive.
    We use the following cookies:
    * Strictly necessary cookies. These are cookies that are required for the operation of our website. They include, for example, cookies that enable you to log into secure areas of our website, use a shopping cart or make use of e-billing services.
    * Analytical or performance cookies. These allow us to recognise and count the number of visitors and to see how visitors move around our website when they are using it. This helps us to improve the way our website works, for example, by ensuring that users are finding what they are looking for easily.
    * Functionality cookies. These are used to recognise you when you return to our website. This enables us to personalise our content for you, greet you by name and remember your preferences (for example, your choice of language or region).
    * Targeting cookies. These cookies record your visit to our website, the pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.
    You can find more information about the individual cookies we use and the purposes for which we use them in the table below:
    Cookie Title
    Cookie Name
    Purpose 
    More information
    [COOKIE TITLE]
    [COOKIE NAME]
    DESCRIPTION OF THE PURPOSE FOR WHICH THE COOKIE IS USED AND ITS DURATION
    Examples of purposes for which a cookie may be used:
    This cookie is essential for our site to:
    (a) Estimate our audience size and usage pattern.
    (b) Store information about your preferences, and so allow us to customise our site and to provide you with offers that are targeted to your individual interests.
    (c) Speed up your searches.
    (d) Recognise you when you return to our site.
    [(f) [OTHER PURPOSES].
    [LINK TO EXTERNAL INFORMATION WHERE APPROPRIATE]
    Please note that the following third parties may also use cookies, over which we have no control. These named third parties may include, for example, advertising networks and providers of external services like web traffic analysis services. These third-party cookies are likely to be analytical cookies or performance cookies or targeting cookies:
    Google ads, Bing ads, Facebook, Google Analytics, Google Tag Manager.
    To deactivate the use of third-party advertising cookies, you may visit the consumer page to manage the use of these types of cookies.
    To deactivate the use of third-party advertising cookies, you may visit the consumer page to manage the use of these types of cookies.
    You can choose which analytical, functionality and targeting cookies we can set via a setting in your browser which allows you to block some or all cookies. 
    However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our website.
    Except for essential cookies, all cookies will expire after a specified period.
    
    2
    
    

  `;

  const lines = content.split('\n');
  let htmlContent = [];
  let inList = false;

  for (const line of lines) {
    if (line.startsWith('- ')) {
      if (!inList) {
        htmlContent.push(<ul key={htmlContent.length}>{[]}</ul>);
        inList = true;
      }
      htmlContent[htmlContent.length - 1].props.children.push(<li key={htmlContent[htmlContent.length - 1].props.children.length}>{line.slice(2)}</li>);
    } else {
      if (inList) {
        inList = false;
      }
      if (line.includes('------')) {
        htmlContent.push(<h1 className='text-start' key={htmlContent.length}>{line.replace(/-+/g, '').trim()}</h1>);
      } else if (line.includes('--------')) {
        htmlContent.push(<h2 className='text-start' key={htmlContent.length}>{line.replace(/-+/g, '').trim()}</h2>);
      } else {
        htmlContent.push(<p className='text-start' key={htmlContent.length}>{line}</p>);
      }
    }
  }
  return (
    <div className='text-center' style={{ minHeight: '600px' }}>
            

    <h1 style={{ fontSize: '32px' }} className='my-5'>Cookie Policy</h1>
    <div className='mt-5'>{htmlContent}</div>

</div>
  )
}
